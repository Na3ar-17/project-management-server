import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/all/:projectId')
  @Auth()
  async getAll(@Param('projectId') projectId: string) {
    return await this.tasksService.getAll(projectId);
  }
}
