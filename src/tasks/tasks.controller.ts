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
import { TasksService } from './tasks.service';
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

  @Get('/get-one/:projectId/:id')
  @Auth()
  async getOneById(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
  ) {
    return await this.tasksService.getOneById(projectId, id);
  }

  @Post('/:projectId')
  @Auth()
  async create(@Param('projectId') projectId: string) {
    return await this.tasksService.create(projectId);
  }
  @Delete('/:projectId/:id')
  @Auth()
  async delete(@Param('projectId') projectId: string, @Param('id') id: string) {
    return await this.tasksService.delete(projectId, id);
  }

  @Put('/update')
  @Auth()
  @UsePipes(new ValidationPipe())
  async update(@Body() dto: UpdateTaskDto) {
    return await this.tasksService.update(dto);
  }
}
