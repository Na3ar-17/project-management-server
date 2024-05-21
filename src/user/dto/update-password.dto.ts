import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  @IsString()
  token: string;
}
