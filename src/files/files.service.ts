import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilesService {
  async uploadImage(image: Express.Multer.File) {
    const {
      buffer,
      destination,
      fieldname,
      mimetype,
      stream,
      encoding,
      ...rest
    } = image;
    return rest;
  }
}
