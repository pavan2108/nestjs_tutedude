import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Task } from '../../models/task.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UserService } from '../user/user.service';
import { AssignTaskDto } from './dto/assign-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { GetTasksDto } from './dto/get-tasks.dto';
import { RoleEnum } from '../../utils/enums/role.enum';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly taskRepository: Repository<Task>,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreateTaskDto) {
    const taskInfo = this.taskRepository.create({
      ...dto,
      customer: {
        id: dto.customer_id,
      },
    });
    await this.taskRepository.save(taskInfo);
    return taskInfo;
  }

  async assign(dto: AssignTaskDto) {
    const userExists = await this.userService.userExistsById(dto.userId);
    if (!userExists) {
      throw new HttpException(
        'Assigned user not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.taskRepository.update(
      {
        id: dto.taskId,
      },
      {
        user: {
          id: dto.userId,
        },
        assignedTo: dto.userId,
      },
    );
  }

  async update(id: number, dto: UpdateTaskDto) {
    await this.taskRepository.update(
      {
        id,
      },
      {
        ...dto,
      },
    );
  }

  async delete(id: number) {
    await this.taskRepository.delete({
      id,
    });
  }

  async get(dto: GetTasksDto) {
    const whereClause: FindOptionsWhere<Task> = {};
    if (dto.role === RoleEnum.USER) {
      whereClause.assignedTo = dto.userId;
    }

    if (!dto.limit) {
      dto.limit = 10;
    }
    if (dto.limit <= 0 || dto.limit >= 10) {
      dto.limit = 10;
    }

    if (!dto.page) {
      dto.page = 0;
    }
    if (dto.page < 0) {
      dto.page = 0;
    }

    if (dto.status) {
      whereClause.status = dto.status;
    }

    if (dto.title) {
      whereClause.title = ILike(`%${dto.title}%`);
    }

    const data = await this.taskRepository.findAndCount({
      where: whereClause,
      relations: {
        customer: true,
        user: true,
      },
      skip: dto.page * dto.limit,
      take: dto.limit,
    });

    return {
      data: data[0],
      total: data[1],
      hasNextPage: data[1] - dto.page * dto.limit > 0,
    };
  }
}
