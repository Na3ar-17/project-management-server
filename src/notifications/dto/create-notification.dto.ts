import { IsOptional, IsString, MinLength } from 'class-validator';
import { EnumNotificationType } from '@prisma/client';

export class CreateNotificationDto {
  @IsString()
  content: string;

  @IsOptional()
  type?: EnumNotificationType;

  @IsString()
  recipientId: string;
}
