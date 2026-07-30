import { Request } from 'express';
import { RoleEnum } from '../enums/role.enum';

export type AuthenticatedUser = {
  id: number;
  role: RoleEnum;
  expiresAt: Date;
};

export type AuthRequest = Request & { user: AuthenticatedUser };
