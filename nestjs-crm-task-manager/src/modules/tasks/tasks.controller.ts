import { Controller, Get, Query, Req } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TasksService } from './tasks.service';
import { type AuthRequest } from '../../utils/types/auth.types';

@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  get(@Req() req: AuthRequest, @Query() dto: GetTasksDto) {
    return this.tasksService.get({
      ...dto,
      userId: req.user.id,
      role: req.user.role,
    });
  }
}
