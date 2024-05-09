import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { slugify } from 'src/utils/slugGenerator';
import { StatisticsService } from 'src/statistics/statistics.service';
import { isBefore } from 'date-fns';
import { isDateBefore } from 'src/utils/dateChecker';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private statisticsService: StatisticsService,
  ) {}

  async getById(userId: string, id: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id,
        OR: [
          {
            userId,
          },

          {
            members: {
              some: {
                userId,
              },
            },
          },
        ],
      },
    });

    if (!project)
      throw new NotFoundException(
        `Project with id: ${id} and userId: ${userId} not found`,
      );

    return project;
  }

  async getAll(userId: string) {
    return await this.prisma.project.findMany({
      where: {
        OR: [
          {
            userId,
          },
          {
            members: {
              some: {
                userId,
              },
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        members: true,
      },
    });
  }

  async create(userId: string) {
    const count = await this.prisma.project.count({
      where: {
        userId,
      },
    });

    let projectName = count > 0 ? `Untitled ${count}` : 'Untitled';
    let slug = slugify(projectName);

    const project = await this.prisma.project.create({
      data: {
        name: projectName,
        end: '',
        image: '',
        slug: slug,
        ownerId: userId,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const statistics = await this.statisticsService.create(project.id);

    return project;
  }

  async delete(userId: string, id: string) {
    const project = await this.getById(userId, id);

    const deleted = await this.prisma.project.delete({
      where: {
        id: project.id,
        userId,
      },
    });

    return {
      message: 'Successfully deleted',
    };
  }

  async update(dto: UpdateProjectDto, userId: string) {
    const project = await this.getById(userId, dto.id);

    isDateBefore({ deadLine: dto.end, createdAt: project.createdAt });

    const updated = await this.prisma.project.update({
      where: {
        id: project.id,
      },
      data: {
        image: dto.image,
        name: dto.name || project.name,
        end: dto.end || project.end,
        slug: slugify(dto.name) || project.slug,
      },
    });

    return updated;
  }
}
