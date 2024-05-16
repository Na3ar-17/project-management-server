import { IsEmail, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(20, { message: 'The name is too long' })
  @MinLength(3, { message: 'The name must contains at least 3 characters' })
  fullName: string;

  @IsString()
  @IsEmail()
  @MaxLength(30, { message: 'Email is too long' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must contains at least 6 characters' })
  password: string;
}
