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
        to: 'gavruk2017@gmail.com', // list of receivers
        from: await this.configService.get('USER_EMAIL_SENDER'), // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });
  }
}
