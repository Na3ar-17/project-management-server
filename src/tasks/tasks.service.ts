import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async getAll(projectId: string) {
    return await this.prisma.task.findMany({
      where: {
        projectId,
      },
    });
  }

  async create(projectId: string) {
    const newTask = await this.prisma.task.create;
  }
}
