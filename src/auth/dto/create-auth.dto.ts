import { IsEmail, IsString, Min, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must contains at least 6 characters' })
  password: string;
}
