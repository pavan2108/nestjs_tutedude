import { ApiProperty } from '@nestjs/swagger';
import { BaseTaskDto } from './base-task.dto';

export class CreateTaskDto extends BaseTaskDto {
  @ApiProperty({
    example: 1,
  })
  customer_id!: number;

  @ApiProperty({
    example: 'Customer engagment',
  })
  title!: string;
}
