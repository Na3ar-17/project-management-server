import { IsString } from 'class-validator';

export class RejectNotificationDto {
  @IsString()
  recipientId: string;

  @IsString()
  ownerId: string;

  @IsString()
  id: string;
}
