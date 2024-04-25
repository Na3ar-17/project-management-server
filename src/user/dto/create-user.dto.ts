import { IsEmail, IsString, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  companyName?: string;

  @IsString()
  @MinLength(6, { message: 'Password must contains at least 6 characters' })
  password: string;
}
