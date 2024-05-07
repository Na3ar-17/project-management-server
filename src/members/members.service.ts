import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class MembersService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private notificationsService: NotificationsService,
  ) {}

  async getAll(projectId: string) {
    return await this.prisma.member.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
        role: true,
        userId: true,
        user: true,
      },
    });
  }

  async getOneById(id: string, projectId: string) {
    const member = await this.prisma.member.findUnique({
      where: {
        id,
        projectId,
      },
    });

    if (!member) {
      throw new NotFoundException('Not found');
    }
    return member;
  }

  async addMember(userId: string, projectId: string, ownerId: string) {
    const user = await this.userService.getById(userId);
    const members = await this.prisma.member.findMany({
      where: {
        projectId,
      },
    });

    if (members.length <= 0) {
      const firstAddingMember = await this.prisma.member.createMany({
        data: [
          { userId: userId, role: 'Member', projectId },
          {
            projectId,
            userId: ownerId,
            role: 'Creator',
          },
        ],
      });

      return firstAddingMember;
    } else {
      const newMember = await this.prisma.member.create({
        data: {
          user: {
            connect: {
              id: user.id,
            },
          },
          role: 'Member',
          project: {
            connect: {
              id: projectId,
            },
          },
        },
        select: {
          project: {
            select: {
              slug: true,
              id: true,
            },
          },
        },
      });

      return newMember;
    }
  }

  async cick(userId: string, projectId: string) {
    // const member = await this.
  }
}
