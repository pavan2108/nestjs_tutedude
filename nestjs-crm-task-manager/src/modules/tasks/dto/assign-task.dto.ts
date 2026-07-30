import { ApiProperty } from '@nestjs/swagger';

export class AssignTaskDto {
  @ApiProperty({
    example: 1,
  })
  taskId: number;

  @ApiProperty({
    example: 1,
  })
  userId: number;
}
