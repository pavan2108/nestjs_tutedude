import { ApiProperty } from '@nestjs/swagger';

export class BaseUserDto {
  @ApiProperty({
    type: 'string',
    example: 'test1@test.com',
  })
  email!: string;

  @ApiProperty({
    type: 'string',
    example: 'P@ssword.01',
  })
  password!: string;
}
