import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { StatisticsModule } from './statistics/statistics.module';
import { FilesModule } from './files/files.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    ProjectModule,
    StatisticsModule,
    FilesModule,
    TasksModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
