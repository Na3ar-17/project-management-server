import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { NodemailerController } from './nodemailer.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [NodemailerController],
  providers: [NodemailerService],
  imports: [ConfigModule, JwtModule],
})
export class NodemailerModule {}
