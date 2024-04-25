import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        projects: true,
      },
    });

    if (!user) throw new NotFoundException(`User with id: ${id} not found`);

    return user;
  }

  async getByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getProfile(id: string) {
    const profile = await this.getById(id);

    const { password, ...rest } = profile;

    return rest;
  }

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        fullName: dto.fullName,
        companyName: dto.companyName,
        password: await hash(dto.password),
        imgLink: '',
      },
    });

    return user;
  }

  async update(dto: UpdateUserDto) {
    let data = dto;
    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    const user = await this.prisma.user.update({
      where: {
        id: dto.id,
      },
      data,

      select: {
        fullName: true,
        companyName: true,
        imgLink: true,
        email: true,
      },
    });

    return user;
  }
}
