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
          id: projectId,
        },
      },
    });
  }
}
