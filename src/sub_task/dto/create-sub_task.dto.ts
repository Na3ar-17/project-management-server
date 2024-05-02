import { IsString, MaxLength } from 'class-validator';

export class CreateSubTaskDto {
  @IsString()
  @MaxLength(30, { message: 'Title is too long' })
  title: string;
}
