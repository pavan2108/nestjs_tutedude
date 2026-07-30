import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskStatusEnum } from '../../../utils/enums/task-status.enum';

export class BaseTaskDto {
  @ApiPropertyOptional({
    example: 'Engage with customer xyz',
  })
  description: string;

  @ApiPropertyOptional({
    example: TaskStatusEnum.TODO,
  })
  status: TaskStatusEnum;

  @ApiPropertyOptional({
    example: Date.now(),
  })
  dueData: Date;
}
