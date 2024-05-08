import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Member } from '@prisma/client';

export const CurrentMember = createParamDecorator(
  (data: keyof Member, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const member = req.member;

    return data ? member[data] : member;
  },
);
