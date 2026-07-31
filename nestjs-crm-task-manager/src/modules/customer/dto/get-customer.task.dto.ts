import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetCustomerTaskDto {
  @ApiPropertyOptional({
    example: 0,
  })
  page: number;

  @ApiPropertyOptional({
    example: 10,
  })
  limit: number;

  @ApiProperty({
    example: 1,
  })
  customer_id: number;
}
