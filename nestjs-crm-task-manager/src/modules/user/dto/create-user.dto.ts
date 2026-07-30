import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../../../utils/enums/role.enum';
import { BaseUserDto } from './base-user.dto';

export class CreateUserDto extends BaseUserDto {
  @ApiProperty({
    type: 'string',
    enum: RoleEnum,
    example: RoleEnum.USER,
  })
  role?: RoleEnum;
}
