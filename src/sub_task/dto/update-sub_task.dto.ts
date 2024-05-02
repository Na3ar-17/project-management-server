import { PartialType } from '@nestjs/mapped-types';
import { CreateSubTaskDto } from './create-sub_task.dto';

export class UpdateSubTaskDto extends PartialType(CreateSubTaskDto) {}
