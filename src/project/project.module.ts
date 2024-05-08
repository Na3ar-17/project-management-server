import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatisticsService } from 'src/statistics/statistics.service';
import { StatisticsModule } from 'src/statistics/statistics.module';

@Module({
  controllers: [ProjectController],
  providers: [ProjectService, PrismaService, StatisticsService],
  exports: [ProjectService, StatisticsService],
})
export class ProjectModule {}
