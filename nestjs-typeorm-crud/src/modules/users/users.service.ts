import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../models/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoggerService } from '../../helpers/logger/logger.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly logger: LoggerService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const emailCount = await this.userRepository.count({
      where: {
        email: dto.email,
      },
    });
    if (emailCount > 0) {
      this.logger.error(
        `Their is already a user with the email : ${dto.email}`,
      );
    }

    const userInfo = this.userRepository.create({
      ...dto,
    });

    await this.userRepository.save(userInfo);

    this.logger.info(`successfully created user with id: ${userInfo.id}`);
    return userInfo;
  }

  async getUserById(id: number) {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    await this.userRepository.update(
      {
        id,
      },
      {
        ...dto,
      },
    );
  }

  async deleteUser(id: number) {
    await this.userRepository.delete({
      id,
    });
  }

  async get(filter: GetUsersDto) {
    const where = {};
    if (filter.name) {
      where['name'] = filter.name;
    }
    if (filter.email) {
      where['email'] = filter.email;
    }

    return this.userRepository.find({
      where,
    });
  }
}
