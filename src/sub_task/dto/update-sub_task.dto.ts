import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateSubTaskDto } from './create-sub_task.dto';

export class UpdateSubTaskDto extends PartialType(CreateSubTaskDto) {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  taskId?: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @MaxLength(30, { message: 'Title is too long' })
  title?: string;
}
