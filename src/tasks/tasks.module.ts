import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';
import { ProjectModule } from 'src/project/project.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService, PrismaService, ProjectService],
  imports: [ProjectModule],
})
export class TasksModule {}
