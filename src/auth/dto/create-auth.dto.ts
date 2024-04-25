import { IsEmail, IsString, Min } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Min(6, { message: 'Password must contains at least 6 characters' })
  password: string;
}
