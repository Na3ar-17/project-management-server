import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, ProjectModule, StatisticsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
