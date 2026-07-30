import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { Task } from '../../models/task.entity';
import { DataSource } from 'typeorm';
import { TasksService } from './tasks.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [TasksController],
  providers: [
    {
      provide: 'TASK_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
      inject: ['DATA_SOURCE'],
    },
    TasksService,
  ],
})
export class TasksModule {}
