import { IsEnum, IsOptional } from 'class-validator';
import { UserRoles } from './create-user.dto';

export class GetUserDtoQuery {
  @IsEnum(UserRoles, {
    message: `Not a valid value expected one of ${UserRoles.ADMIN}, ${UserRoles.USER}`,
  })
  @IsOptional()
  role?: UserRoles;
}
