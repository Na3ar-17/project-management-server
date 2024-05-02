import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubTaskDto } from './dto/create-sub_task.dto';
import { UpdateSubTaskDto } from './dto/update-sub_task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubTaskService {
  constructor(private prisma: PrismaService) {}

  async getOneById(taskId: string, id: string) {
    const subTask = await this.prisma.subTask.findUnique({
      where: {
        id,
        taskId,
      },
    });

    if (!subTask) {
      throw new NotFoundException('Sub task not found');
    }

    return subTask;
  }

  async getAll(taskId: string) {
    return await this.prisma.subTask.findMany({
      where: {
        taskId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async create(taskId: string) {
    const newSubTask = await this.prisma.subTask.create({
      data: {
        title: '',
        task: {
          connect: {
            id: taskId,
          },
        },
      },
    });

    return newSubTask;
  }

  async delete(taskId: string, id: string) {
    const task = await this.getOneById(taskId, id);

    const deleted = await this.prisma.subTask.delete({
      where: {
        id: task.id,
        taskId: task.taskId,
      },
    });

    return { deleted, message: 'Successfully deleted' };
  }
}
