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

  async sendLink(data: { email: string }, req: Request) {
    const { recoverPasswordToken } = await this.createRecoverPasswordToken(
      data.email,
    );
    const url = `http://localhost:3000/${req.cookies['NEXT_LOCALE']}/recover/${recoverPasswordToken}`;

    await this.mailerService
      .sendMail({
        to: data.email,
        from: await this.configService.get('USER_EMAIL_SENDER'),
        subject: 'Rest password',
        text: 'Your url',
        html: `
        <div
        style="
          background-color: #1c1c1c;
          padding: 20px;
          font-family: Arial, sans-serif;
          line-height: 1.6;
        "
      >
        <div
          style="
            max-width: 600px;
            margin: auto;
            background-color: #2a2a2a;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          "
        >
          <div
            style="
              background-color: #373737;
              color: #ffffff;
              padding: 20px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
            "
          >
            Password Reset
          </div>
          <div style="padding: 20px">
            <p style="font-size: 16px; color: #b4b4b4">Hello,</p>
            <p style="font-size: 16px; color: #b4b4b4">
              We received a request to reset your password.Click the button below
              to reset it:
            </p>
            <div style="text-align: center; margin: 20px 0">
              <a
                href="${url}"
                target="_blank"
                style="
                  display: inline-block;
                  background-color: #268bff;
                  background-image: linear-gradient(#268bff, hsl(252, 82, 57));
                  color: #ffffff;
                  padding: 12px 20px;
                  border-radius: 4px;
                  text-decoration: none;
                  font-size: 16px;
                  border: none;
                  text-align: center;
                  -webkit-appearance: none;
                  -moz-appearance: none;
                  appearance: none;
                "
              >
                Reset Password
              </a>
            </div>
            <p style="font-size: 16px; color: #b4b4b4">
              If you didn't request a password reset, please ignore this email or
              contact support if you have questions.
            </p>
            <p style="font-size: 16px; color: #b4b4b4">Thanks,</p>
            <p style="font-size: 16px; color: #b4b4b4">The Team</p>
          </div>
          <div
            style="
              background-color: #333333;
              padding: 20px;
              text-align: center;
              font-size: 14px;
              color: #666666;
            "
          >
            <p style="color: #666666">
              If you're having trouble with the button above, copy and paste the
              URL below into your web browser:
            </p>
            <a href="${url}" target="_blank" style="color: #268bff"
              >${url}</a
            >
          </div>
        </div>
      </div>
      `,
      })
      .then(() => {})
      .catch((e) => {
        console.log(e);
      });

    return {
      recoverPasswordToken,
      url,
    };
  }

  private async createRecoverPasswordToken(email: string) {
    const key = await this.configService.get('RECOVER_PASSWORD_TOKEN');
    const data = { email };

    const recoverPasswordToken = await this.jwt.sign(data, {
      expiresIn: '2m',
      secret: key,
    });

    return { recoverPasswordToken };
  }
}
