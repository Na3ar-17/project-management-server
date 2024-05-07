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
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('/all')
  @Auth()
  async getAll(@CurrentUser('id') userId: string) {
    return await this.projectService.getAll(userId);
  }

  @Get('/get-one/:id')
  @Auth()
  async getById(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return await this.projectService.getById(userId, id);
  }

  @Post('/create')
  @Auth()
  async create(@CurrentUser('id') userId: string) {
    return await this.projectService.create(userId);
  }

  @Delete('delete/:id')
  @Auth()
  async delete(@CurrentUser('id') userId: string, @Param('id') id: string) {
    return await this.projectService.delete(userId, id);
  }

  @Put('update')
  @UsePipes(new ValidationPipe())
  @Auth()
  async update(
    @Body() dto: UpdateProjectDto,
    @CurrentUser('id') userId: string,
  ) {
    return await this.projectService.update(dto, userId);
  }
}
