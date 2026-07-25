import { Injectable } from '@nestjs/common';
import { CreateUserDto, UserRoles } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  USERS_DATA: CreateUserDto[] = [];

  private filterData(param: string, value: string) {
    return this.USERS_DATA.filter((user) => user[param] === value);
  }

  getUserData(role?: UserRoles) {
    if (role) {
      return this.filterData('role', role);
    } else {
      return this.USERS_DATA;
    }
  }

  addUserData(user: CreateUserDto) {
    this.USERS_DATA.push(user);
  }
}
