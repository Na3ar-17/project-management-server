import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { NodemailerController } from './nodemailer.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [NodemailerController],
  providers: [NodemailerService],
  imports: [ConfigModule],
})
export class NodemailerModule {}
