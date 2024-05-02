import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSubTaskDto {
  @IsString()
  id: string;

  @IsString()
  taskId: string;

  @IsString()
  @IsOptional()
  @MaxLength(30, { message: 'Title is too long' })
  title?: string;

  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;
}
