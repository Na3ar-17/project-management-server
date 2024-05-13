import { BadRequestException } from '@nestjs/common';
import { isBefore, isYesterday } from 'date-fns';

export const isDateBefore = ({
  createdAt,
  deadLine,
  message = "You can't select this date",
}: {
  createdAt: string | Date;
  deadLine: string;
  message?: string;
}) => {
  if (isBefore(deadLine, createdAt) || isYesterday(deadLine)) {
    throw new BadRequestException(message);
  }
};
