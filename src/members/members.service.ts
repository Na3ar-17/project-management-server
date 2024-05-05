import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class MembersService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async getAll(projectId: string) {
    return await this.prisma.member.findMany({
      where: {
        projectId,
      },
    });
  }

  async addMember(userId: string, projectId: string) {
    const user = await this.userService.getById(userId);

    const newMember = await this.prisma.member.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        role: 'Member',
        project: {
          connect: {
            id: projectId,
          },
        },
      },
    });

    return newMember;
  }
}
