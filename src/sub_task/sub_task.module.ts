import { Module } from '@nestjs/common';
import { SubTaskService } from './sub_task.service';
import { SubTaskController } from './sub_task.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [SubTaskController],
  providers: [SubTaskService, PrismaService],
})
export class SubTaskModule {}
