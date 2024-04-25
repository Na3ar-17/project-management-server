import { IsEmail, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  fullName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  companyName?: string;

  @IsString()
  @Min(6, { message: 'Password must contains at least 6 characters' })
  password: string;
}
