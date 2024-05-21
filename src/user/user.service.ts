import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';
import { Request, Response } from 'express';
import { REFRESH_TOKEN_NAME } from 'src/constants/tokens.constants';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private nodemailer: NodemailerService,
    private jwt: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException(`User not found`);

    return user;
  }

  async getByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getByEmailForPasswordResetting(
    email: string,
    res: Response,
    req: Request,
  ) {
    const user = await this.getByEmail(email);

    if (user) {
      const { passwordResetToken, link } = await this.nodemailer.sendLink(
        {
          email,
        },
        req,
      );

      await this.nodemailer.addPasswordResetTokenToResponse(
        res,
        passwordResetToken,
      );
    }

    return {
      success: !!user,
    };
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
        password: await hash(dto.password),
        imgLink: '',
      },
    });

    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    let data = dto;

    if (dto.password) {
      data = {
        ...dto,
        password: await hash(dto.password),
      };
    }
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data,
      select: {
        fullName: true,
        imgLink: true,
        email: true,
      },
    });

    return user;
  }

  async delete(id: string, res: Response) {
    const user = await this.getById(id);
    await this.removeRefreshTokenFromResponse(res);
    return this.prisma.user.delete({
      where: {
        id: user.id,
      },
    });
  }

  async searchByEmail(email: string, currentUserId: string) {
    if (!email.trim()) {
      return [];
    }

    const users = await this.prisma.user.findMany({
      where: {
        email: {
          contains: email.toLowerCase(),
        },

        OR: [
          {
            id: {
              not: currentUserId,
            },
          },
        ],
      },
      select: {
        fullName: true,
        email: true,
        imgLink: true,
        id: true,
      },
    });

    return users;
  }

  async updatePassword(dto: UpdatePasswordDto) {
    const { token, password } = dto;

    const tokenData = await this.jwt.verify(token, {
      secret: await this.configService.get('RECOVER_PASSWORD_TOKEN'),
    });

    const updated = await this.prisma.user.update({
      where: {
        email: tokenData.email,
      },
      data: {
        password: await hash(password),
      },
    });

    return updated;
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      // lax if production
      sameSite: 'none',
    });
  }
}
