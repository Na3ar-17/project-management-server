import { IsString, MinLength } from 'class-validator';
import { EnumNotificationType } from '@prisma/client';

export class CreateNotificationDto {
  @IsString()
  content: string;

  type: EnumNotificationType;

  @IsString()
  recipientId: string;

  @IsString()
  ownerId: string;
}
