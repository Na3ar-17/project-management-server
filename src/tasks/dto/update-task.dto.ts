import { PartialType } from '@nestjs/mapped-types';
import { EnumTaskPriority, EnumTaskStatus } from '@prisma/client';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  id: string;

  @IsString()
  projectId: string;

  @IsString()
  @MinLength(2, { message: 'The title must contains at least 2 characters' })
  @MaxLength(35, { message: 'The title is too long' })
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  priority?: EnumTaskPriority;

  @IsString()
  @IsOptional()
  status?: EnumTaskStatus;

  @IsString()
  @IsOptional()
  dueDate?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
