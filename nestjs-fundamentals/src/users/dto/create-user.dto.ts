import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => (value as string).trim().toLowerCase())
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => (value as string).trim().toLowerCase())
  @Matches(/^[a-zA-Z0-9]+$/)
  username: string;

  @IsEnum(UserRoles, {
    message: `Not a valid value expected one of ${UserRoles.ADMIN}, ${UserRoles.USER}`,
  })
  role: UserRoles;
}
