import { Module } from '@nestjs/common';
import { User } from '../../models/user.entity';
import { DataSource } from 'typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ['DATA_SOURCE'],
    },
    UserService,
  ],
})
export class UserModule {}
