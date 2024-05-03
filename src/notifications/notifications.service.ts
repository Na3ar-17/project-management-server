import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string) {
    return await this.prisma.notification.findMany({
      where: {
        recipientId: userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
      include: {
        owner: {
          select: {
            email: true,
            fullName: true,
            id: true,
            imgLink: true,
            projects: true,
          },
        },
      },
    });
  }

  async createInvitation(dto: CreateNotificationDto, ownerId: string) {
    const newNotification = await this.prisma.notification.create({
      data: {
        content: dto.content,
        type: 'Invitation',
        owner: {
          connect: {
            id: ownerId,
          },
        },
        recipient: {
          connect: {
            id: dto.recipientId,
          },
        },
      },
    });

    return newNotification;
  }
}
