import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class NodemailerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    private jwt: JwtService,
  ) {}

  async send() {
    // return await this.mailerService
    //   .sendMail({
    //     to: 'gavruluknazar0210@gmail.com',
    //     from: await this.configService.get('USER_EMAIL_SENDER'),
    //     subject: 'Testing Nest MailerModule ✔',
    //     text: 'welcome',
    //     html: '<b>welcome</b>',
    //   })
    //   .then(() => {
    //     console.log('sent');
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });

    const accessTokenSession = this.createAccessToken(
      'gavruluknazar0210@gmail.com',
    );
    return accessTokenSession;
  }

  private async createAccessToken(
    email: string = 'gavruluknazar0210@gmail.com',
  ) {
    const key = await this.configService.get('RESTORE_PASSWORD_TOKEN');
    const data = { email };

    const accessTokenSession = await this.jwt.sign(data, {
      expiresIn: '2m',
      secret: key,
    });

    return { accessTokenSession };
  }
}
