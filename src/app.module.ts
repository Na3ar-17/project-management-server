import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, ProjectModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
