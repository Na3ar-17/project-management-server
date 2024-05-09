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
        createdAt: 'asc',
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

    if (dto.status == 'completed') {
      await this.statisticsService.updateTasksCompleted({
        projectId: task.projectId,
        type: 'increment',
      });
    }

    if (dto.status !== 'completed') {
      await this.statisticsService.updateTasksCompleted({
        projectId: task.projectId,
        type: 'decrement',
      });
    }

    const updated = await this.prisma.task.update({
      where: {
        id: dto.id,
        projectId: dto.projectId,
      },
      data: {
        title: dto.title || task.title,
        description: dto.description,
        status: dto.status || task.status,
        priority: dto.priority || task.priority,
        dueDate: dto.dueDate || task.dueDate,
      },
    });

    return updated;
  }
}

export const ProjectTasksPage = ({ projectId }: { projectId: string }) => {};
