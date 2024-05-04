import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async getById(userId: string, id: string) {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id,
        recipientId: userId,
      },
    });

    if (!notification) {
      throw new NotFoundException('Not found');
    }

    return notification;
  }

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

  async delete(userId: string, id: string) {
    const notification = await this.getById(userId, id);

    const deleted = await this.prisma.notification.delete({
      where: {
        id: notification.id,
        recipientId: notification.recipientId,
      },
    });

    return {
      deleted,
      message: 'Successfully deleted',
    };
  }
}
