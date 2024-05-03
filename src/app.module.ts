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
import { MembersModule } from './members/members.module';

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
    MembersModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
