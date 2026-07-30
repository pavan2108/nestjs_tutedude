import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetTasksDto } from './dto/get-tasks.dto';
import { TasksService } from './tasks.service';
import { type AuthRequest } from '../../utils/types/auth.types';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AssignTaskDto } from './dto/assign-task.dto';

@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    return this.tasksService.create(dto);
  }

  @Put('assign')
  async assign(@Body() dto: AssignTaskDto) {
    return this.tasksService.assign(dto);
  }

  @Put(':task_id')
  async update(
    @Param('task_id', ParseIntPipe) task_id: number,
    dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(task_id, dto);
  }

  @Get()
  get(@Req() req: AuthRequest, @Query() dto: GetTasksDto) {
    return this.tasksService.get({
      ...dto,
      userId: req.user.id,
      role: req.user.role,
    });
  }

  @Delete(':task_id')
  async delete(@Param('task_id', ParseIntPipe) task_id: number) {
    return this.tasksService.delete(task_id);
  }
}
