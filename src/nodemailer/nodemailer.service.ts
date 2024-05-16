import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NodemailerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async send() {
    return await this.mailerService
      .sendMail({
        to: 'gavruluknazar0210@gmail.com',
        from: await this.configService.get('USER_EMAIL_SENDER'),
        subject: 'Testing Nest MailerModule ✔',
        text: 'welcome',
        html: '<b>welcome</b>',
      })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  }
}
