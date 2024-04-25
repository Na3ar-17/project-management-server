import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { slugify } from 'src/utils/slugGenerator';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string) {
    return await this.prisma.project.findMany({
      where: {
        userId,
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
        end: '00-00-00',
        image: '',
        slug: slug,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return project;
  }
}
