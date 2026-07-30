import { RoleEnum } from '../enums/role.enum';

export type AuthenticatedUser = {
  user_id: number;
  role: RoleEnum;
  expiresAt: Date;
};
