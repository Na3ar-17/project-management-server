import { Body, Controller, Post } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller('nodemailer')
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}

  @Post('send')
  async sendOTPCode(@Body() data: { email: string }) {
    return await this.nodemailerService.sendOTPCode(data);
  }
}
