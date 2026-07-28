import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private USERS = [
    {
      id: 1,
      name: 'User 1',
      email: 'user1@test.com',
    },
    {
      id: 2,
      name: 'User 2',
      email: 'user2@test.com',
    },
    {
      id: 3,
      name: 'User 3',
      email: 'user3@test.com',
    },
    {
      id: 4,
      name: 'User 4',
      email: 'user4@test.com',
    },
    {
      id: 5,
      name: 'User 5',
      email: 'user5@test.com',
    },
    {
      id: 6,
      name: 'User 6',
      email: 'user6@test.com',
    },
    {
      id: 7,
      name: 'User 7',
      email: 'user7@test.com',
    },
    {
      id: 8,
      name: 'User 8',
      email: 'user8@test.com',
    },
  ];

  isUserExistsByID(id: number): boolean {
    return this.USERS.findIndex((user) => user.id === id) >= 0;
  }

  findById(id: number) {
    return this.USERS.find((user) => user.id === id);
  }
}
