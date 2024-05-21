import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { StatisticsModule } from './statistics/statistics.module';
import { FilesModule } from './files/files.module';
import { TasksModule } from './tasks/tasks.module';
import { SubTaskModule } from './sub_task/sub_task.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { google } from 'googleapis';
import { NodemailerModule } from './nodemailer/nodemailer.module';

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  'https://developers.google.com/oauthplayground',
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});
const accessToken = oauth2Client.getAccessToken();
@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    ProjectModule,
    StatisticsModule,
    FilesModule,
    TasksModule,
    SubTaskModule,
    NotificationsModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          type: 'OAuth2',
          user: process.env.USER_EMAIL_SENDER,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      preview: false,
      template: {
        dir: __dirname + '/templates',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    NodemailerModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
