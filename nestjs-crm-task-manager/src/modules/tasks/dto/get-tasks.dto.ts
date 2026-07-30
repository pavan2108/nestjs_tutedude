import { ApiPropertyOptional } from '@nestjs/swagger';
import { RoleEnum } from '../../../utils/enums/role.enum';
import { TaskStatusEnum } from 'src/utils/enums/task-status.enum';

export class GetTasksDto {
  @ApiPropertyOptional({
    example: 0,
  })
  page: number;

  @ApiPropertyOptional({
    example: 10,
  })
  limit: number;

  @ApiPropertyOptional({
    example: TaskStatusEnum.TODO,
  })
  status: TaskStatusEnum;

  @ApiPropertyOptional({
    example: 'task',
  })
  title: string;

  userId: number;
  role: RoleEnum;
}
