import { Controller, Post } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';

@Controller('nodemailer')
export class NodemailerController {
  constructor(private readonly nodemailerService: NodemailerService) {}

  @Post('send')
  async send() {
    return await this.nodemailerService.send();
  }
}
