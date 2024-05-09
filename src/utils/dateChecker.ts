import { BadRequestException } from '@nestjs/common';
import { isBefore } from 'date-fns';

export const isDateBefore = ({
  createdAt,
  deadLine,
  message = "You can't select this date",
}: {
  createdAt: string | Date;
  deadLine: string;
  message?: string;
}) => {
  if (isBefore(deadLine, createdAt)) {
    throw new BadRequestException(message);
  }
};
