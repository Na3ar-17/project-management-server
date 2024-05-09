import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.statistics.findMany();
  }

  async getByProjectId(projectId: string) {
    const statistics = await this.prisma.statistics.findUnique({
      where: {
        projectId,
      },
      select: {
        projectId: true,
        tasksCompleted: true,
        tasksDeleted: true,
        createdAt: true,
        project: {
          select: {
            tasks: true,
          },
        },
      },
    });

    if (!statistics)
      throw new NotFoundException(
        `Statistics for project: ${projectId} not found`,
      );

    return statistics;
  }

  async create(projectId: string) {
    return await this.prisma.statistics.create({
      data: {
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });
  }

  async delete(projectId: string) {
    const statistics = await this.getByProjectId(projectId);

    return await this.prisma.statistics.delete({
      where: {
        projectId,
        project: {
          id: statistics.projectId,
        },
      },
    });
  }

  async updateTasksCompleted({
    projectId,
    type,
  }: {
    projectId: string;
    type: 'increment' | 'decrement';
  }) {
    const statistics = await this.getByProjectId(projectId);
    const newData =
      type === 'increment'
        ? statistics.tasksCompleted + 1
        : statistics.tasksCompleted !== 0
          ? statistics.tasksCompleted - 1
          : 0;

    return await this.prisma.statistics.update({
      where: {
        projectId,
      },
      data: {
        tasksCompleted: newData,
      },
    });
  }

  async updateTasksDeleted(projectId: string) {
    const statistics = await this.getByProjectId(projectId);

    return await this.prisma.statistics.update({
      where: {
        projectId: projectId,
      },
      data: {
        tasksDeleted: statistics.tasksDeleted + 1,
      },
    });
  }
}
