import { Module } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { DataSource } from 'typeorm';
import { UserController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ['DATA_SOURCE'],
    },
    UsersService,
  ],
})
export class UsersModule {}
