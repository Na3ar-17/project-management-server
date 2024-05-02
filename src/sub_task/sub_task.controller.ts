import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SubTaskService } from './sub_task.service';
import { CreateSubTaskDto } from './dto/create-sub_task.dto';
import { UpdateSubTaskDto } from './dto/update-sub_task.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('sub-task')
export class SubTaskController {
  constructor(private readonly subTaskService: SubTaskService) {}

  @Get('all/:taskId')
  @Auth()
  async getAll(@Param('taskId') taskId: string) {
    return await this.subTaskService.getAll(taskId);
  }

  @UsePipes(new ValidationPipe())
  @Post('create/:taskId')
  @Auth()
  async create(@Param('taskId') taskId: string, @Body() dto: CreateSubTaskDto) {
    return await this.subTaskService.create(taskId, dto);
  }

  @Delete('delete/:taskId/:id')
  @Auth()
  async delete(@Param('taskId') taskId: string, @Param('id') id: string) {
    return await this.subTaskService.delete(taskId, id);
  }

  @Put('update')
  @Auth()
  async update(@Body() dto: UpdateSubTaskDto) {
    return await this.subTaskService.update(dto);
  }
}
