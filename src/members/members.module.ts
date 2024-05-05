import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersController } from './members.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [MembersController],
  providers: [MembersService, PrismaService, UserService],
})
export class MembersModule {}
