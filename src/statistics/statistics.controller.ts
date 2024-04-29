import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { CreateStatisticDto } from './dto/create-statistic.dto';
import { UpdateStatisticDto } from './dto/update-statistic.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('/all')
  @Auth()
  async getAll() {
    return await this.statisticsService.getAll();
  }

  @Get('/:projectId')
  @Auth()
  async getOne(@Param('projectId') projectId: string) {
    return await this.statisticsService.getByProjectId(projectId);
  }
}
