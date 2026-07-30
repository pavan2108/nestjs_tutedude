import { RoleEnum } from '../../../utils/enums/role.enum';

export class CreateUserDto {
  email!: string;
  password!: string;
  role?: RoleEnum;
}
