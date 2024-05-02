import { Injectable, NotFoundException } from '@nestjs/common';
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
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getOneById(projectId: string, id: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
        projectId,
      },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async create(projectId: string) {
    const tasksCount = await this.prisma.task.count();

    let title = tasksCount > 0 ? `Untitled ${tasksCount}` : 'Untitled';

    const newTask = await this.prisma.task.create({
      data: {
        title: title,
        description: '',
        priority: 'low',
        status: 'inQueue',
        dueDate: '--.--.--',
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    return newTask;
  }

  async delete(projectId: string, id: string) {
    const task = await this.getOneById(projectId, id);

    const deleted = await this.prisma.task.delete({
      where: {
        id: task.id,
        projectId: task.projectId,
      },
    });

    return { task: deleted, message: 'Successfully deleted' };
  }

  async update(dto: UpdateTaskDto) {
    const task = await this.getOneById(dto.projectId, dto.id);

    const updated = await this.prisma.task.update({
      where: {
        id: dto.id,
        projectId: dto.projectId,
      },
      data: {
        title: dto.title || task.title,
        description: dto.description || task.description,
        status: dto.status || task.status,
        priority: dto.priority || task.priority,
        dueDate: dto.dueDate || task.dueDate,
      },
    });

    return updated;
  }
}
