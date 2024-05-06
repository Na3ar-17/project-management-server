import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateSubTaskDto {
  @IsString()
  @MaxLength(30, { message: 'Title is too long' })
  @MinLength(3, { message: 'Title must contains at least 3 characters' })
  title: string;
}
