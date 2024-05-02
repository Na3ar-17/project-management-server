import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateSubTaskDto } from './create-sub_task.dto';

export class UpdateSubTaskDto extends PartialType(CreateSubTaskDto) {
  @IsString()
  id: string;

  @IsString()
  taskId: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
