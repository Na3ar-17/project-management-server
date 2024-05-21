import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { RECOVER_PASSWORD } from 'src/constants/tokens.constants';

@Injectable()
export class NodemailerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    private jwt: JwtService,
  ) {}

  async sendOTPCode(data: { email: string }) {
    const code = Math.floor(Math.random() * 1000000 + 1);
    const { passwordResetToken } = await this.createPasswordResetToken(
      data.email,
    );

    const mail = await this.mailerService
      .sendMail({
        to: data.email,
        from: await this.configService.get('USER_EMAIL_SENDER'),
        subject: 'Code for password resetting',
        text: 'Your code',
        html: `<b style="font-size:20px;">${code}</b>`,
      })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });

    return {
      mail,
      code,
      passwordResetToken,
    };
  }

  async sendLink(data: { email: string }, req: Request) {
    const { passwordResetToken } = await this.createPasswordResetToken(
      data.email,
    );
    const link = `http://localhost:3000/${req.cookies['NEXT_LOCALE']}/reset-password/reset/${passwordResetToken}`;

    await this.mailerService
      .sendMail({
        to: data.email,
        from: await this.configService.get('USER_EMAIL_SENDER'),
        subject: 'Rest password',
        text: 'Your url',
        html: `<div style="font-size:20px;">
        <a class="color:blue;" href="${link}" target="_blank" ">Click here to set a new password!</a>
        </div>`,
      })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });

    return {
      passwordResetToken,
      link,
    };
  }

  private async createPasswordResetToken(email: string) {
    const key = await this.configService.get('RECOVER_PASSWORD_TOKEN');
    const data = { email };

    const passwordResetToken = await this.jwt.sign(data, {
      expiresIn: '2m',
      secret: key,
    });

    return { passwordResetToken };
  }

  async addPasswordResetTokenToResponse(
    res: Response,
    recoverPasswordToken: string,
  ) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + 2);

    res.cookie(RECOVER_PASSWORD, recoverPasswordToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }
}
