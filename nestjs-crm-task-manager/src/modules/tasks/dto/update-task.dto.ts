import { ApiPropertyOptional } from '@nestjs/swagger';
import { BaseTaskDto } from './base-task.dto';

export class UpdateTaskDto extends BaseTaskDto {
  @ApiPropertyOptional({
    example: 'Customer engagment',
  })
  title: string;
}
