import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUserDtoQuery } from './dto/get-users.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers(@Query() query: GetUserDtoQuery) {
    return this.usersService.getUserData(query.role);
  }

  @Post()
  addUser(@Body() data: CreateUserDto) {
    return this.usersService.addUserData(data);
  }
}
