import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateEmailDto extends PartialType(CreateUserDto) {
  @IsString()
  token: string;
}
