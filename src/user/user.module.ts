import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
  imports: [NodemailerModule, JwtModule, ConfigModule],
})
export class UserModule {}
