import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
  UseInterceptors,
  UploadedFile,
  Res,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Auth()
  async profile(@CurrentUser('id') id: string) {
    return this.userService.getProfile(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put()
  @Auth()
  async updateProfile(
    @CurrentUser('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
  }

  @Put('password')
  @UsePipes(new ValidationPipe())
  async updatePassword(
    @Body() dto: UpdatePasswordDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return await this.userService.updatePassword(dto, res);
  }

  @Delete()
  @Auth()
  async delete(
    @CurrentUser('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.delete(id, res);
  }

  @Auth()
  @Post('/search')
  async searchByEmail(
    @Body() data: { email: string },
    @CurrentUser('id') userId: string,
  ) {
    return await this.userService.searchByEmail(data.email, userId);
  }

  @Post('/get-by-email')
  async getByEmail(@Body() data: { email: string }, @Req() req: Request) {
    return await this.userService.getByEmailForPasswordRecover(data.email, req);
  }

  @Post('/verify-token/:token')
  async verifyToken(@Param('token') token: string) {
    return await this.userService.verifyToken(token);
  }
}
