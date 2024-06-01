import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

type TypeLanguages = 'ua' | 'en';

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
    const lang: TypeLanguages = await req.cookies['NEXT_LOCALE'];
    const url = `http://localhost:3000/${lang}/recover/${recoverPasswordToken}`;

    await this.mailerService
      .sendMail({
        to: data.email,
        from: await this.configService.get('USER_EMAIL_SENDER'),
        subject: `${lang === 'en' ? 'Rest password' : 'Змініть пароль'}`,
        text: `${lang === 'en' ? 'Your url' : 'Ваше посилання'}`,
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
            
            ${lang === 'en' ? 'Password Reset' : 'Зміна паролю'}
          </div>
          <div style="padding: 20px">
            <p style="font-size: 16px; color: #b4b4b4">${lang === 'en' ? 'Hello,' : 'Привіт,'}</p>
            <p style="font-size: 16px; color: #b4b4b4"> 
            ${
              lang === 'en'
                ? 'We received a request to reset your password.Click the button below to reset it:'
                : 'Ми отримали запит на зміну вашого паролю. Натисніть кнопку нижче щоб скинути його:'
            }
              
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
              ${lang === 'en' ? 'Reset Password' : 'Змініть пароль'}
              </a>
            </div>
            <p style="font-size: 16px; color: #b4b4b4">
              
              ${
                lang === 'en'
                  ? "If you didn't request a password reset, please ignore this email or contact support if you have questions."
                  : 'Якщо ви не надсилали запит на зміну пароля, проігноруйте цей лист або зверніться до служби підтримки, якщо у вас виникнуть запитання'
              }
            </p>
            ${
              lang === 'en'
                ? `<p style="font-size: 16px; color: #b4b4b4">Thanks,</p>
                  <p style="font-size: 16px; color: #b4b4b4">The Team</p>`
                : `<p style="font-size: 16px; color: #b4b4b4">Дякуємо</p>`
            }
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
              
              ${
                lang === 'en'
                  ? "If you're having trouble with the button above, copy and paste the URL below into your web browser:"
                  : 'Якщо у вас виникли проблеми з кнопкою вище, скопіюйте та вставте URL-адресу нижче у ваш веб-браузер:'
              }
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
