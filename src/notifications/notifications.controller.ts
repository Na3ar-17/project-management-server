import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('/my')
  @Auth()
  async getAll(@CurrentUser('id') id: string) {
    return await this.notificationsService.getAll(id);
  }

  @Post('/invitation')
  @Auth()
  @UsePipes(new ValidationPipe())
  async createInvitation(
    @Body() dto: CreateNotificationDto,
    @CurrentUser('id') id: string,
  ) {
    return await this.notificationsService.createInvitation(dto, id);
  }
}
