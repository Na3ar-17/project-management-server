import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatisticsService } from 'src/statistics/statistics.service';
import { isDateBefore } from 'src/utils/dateChecker';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private statisticsService: StatisticsService,
  ) {}

  async getAll(projectId: string) {
    const tasks = await this.prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        subTasks: true,
        project: {
          include: {
            members: true,
          },
        },
      },
    });

    const tasksWithProgress = await tasks.map((task) => {
      const totalSubtasks = task.subTasks.length;
      const completedSubtasks = task.subTasks.filter(
        (subtask) => subtask.isCompleted,
      ).length;
      const progressPercent =
        totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

      return {
        ...task,
        progressPercent,
      };
    });

    return tasksWithProgress;
  }

  async getOneById(projectId: string, id: string) {
    const task = await this.prisma.task.findUnique({
      where: {
        id,
        projectId,
      },
      include: {
        subTasks: true,
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
        isCompleted: false,
        dueDate: '',
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

    await this.statisticsService.updateTasksDeleted(projectId);

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
    isDateBefore({ createdAt: task.createdAt, deadLine: dto.dueDate });

    const updateData = {
      title: dto.title || task.title,
      description: dto.description,
      status: dto.status || task.status,
      priority: dto.priority || task.priority,
      dueDate: dto.dueDate || task.dueDate,
      isCompleted: dto.isCompleted,
    };

    if (dto.status === 'completed' || dto.isCompleted == true) {
      updateData.isCompleted = true;
      updateData.status = 'completed';

      this.statisticsService.updateTasksCompleted({
        projectId: dto.projectId,
        type: 'increment',
      });
    } else {
      updateData.isCompleted = false;
      updateData.status = dto.status;
    }

    if (dto.isCompleted === false && dto.status === 'completed') {
      updateData.status = 'testing';
      updateData.isCompleted = dto.isCompleted;
    }

    const updated = await this.prisma.task.update({
      where: {
        id: dto.id,
        projectId: dto.projectId,
      },
      data: updateData,
    });

    return updated;
  }
}

export const ProjectTasksPage = ({ projectId }: { projectId: string }) => {};
