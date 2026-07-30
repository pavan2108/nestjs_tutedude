import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from '../../helpers/decarators/public.decorator';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('user')
@Public()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiOperation({
    summary: 'Create user / admin',
    description: 'Create users / admin if not already exist',
  })
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto) {
    return this.userService.login(dto);
  }
}
