import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { User } from '../../models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggerService } from '../../helpers/logger/logger.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService,
  ) {}

  async create(dto: CreateUserDto) {
    const emailCount = await this.userRepository.count({
      where: {
        email: dto.email,
      },
    });
    if (emailCount > 0) {
      this.logger.error('Their is already an user with the email');
      throw new HttpException('Email already exist', HttpStatus.CONFLICT);
    }
    const hashedPassword: string = await bcrypt.hash(dto.password, 10);

    const userInfo = this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });

    await this.userRepository.save(userInfo);
    return {
      ...userInfo,
      password: undefined,
    };
  }

  async login(dto: LoginUserDto) {
    const data = await this.userRepository.findOne({
      where: {
        email: dto.email,
      },
    });
    if (!data) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    if (await bcrypt.compare(dto.password, data.password)) {
      const token = await this.jwtService.signAsync({
        id: data.id,
        role: data.role,
      });
      return { token };
    }

    throw new HttpException(
      'email / password is wrong',
      HttpStatus.BAD_REQUEST,
    );
  }
}
