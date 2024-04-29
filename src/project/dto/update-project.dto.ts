import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import {
  IsOptional,
  IsString,
  MaxLength,
  MinDate,
  MinLength,
} from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsString()
  @MinLength(3, { message: 'The name must contains at least 3 characters' })
  @MaxLength(35, { message: 'The name is too long' })
  @IsOptional()
  name?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsString()
  @IsOptional()
  end?: string;

  id: string;
}
