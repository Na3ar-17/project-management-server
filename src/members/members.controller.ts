import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Auth()
  @Get('/all/:projectId')
  async getAll(@Param('projectId') projectId: string) {
    return await this.membersService.getAll(projectId);
  }

  @Auth()
  @Post('/add-new/:projectId')
  async addMember(
    @CurrentUser('id') userId: string,
    @Param('projectId') projectId: string,
  ) {
    return await this.membersService.addMember(userId, projectId);
  }
}
