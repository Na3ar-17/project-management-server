import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async getAll(userId: string) {
    return await this.prisma.notification.findMany({
      where: {
        recipientId: userId,
      },
    });
  }

  async createInvitation(dto: CreateNotificationDto) {
    const newNotification = await this.prisma.notification.create({
      data: {
        content: dto.content,
        type: 'Invitation',
        owner: {
          connect: {
            id: dto.ownerId,
          },
        },
        recipient: {
          connect: {
            id: dto.recipientId,
          },
        },
      },
    });
  }
}
