import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { unlink } from 'node:fs';

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

  async deleteImage(imageName: string) {
    const imagePath = `uploads/${imageName}`;

    unlink(imagePath, (error) => {
      if (error) {
        throw new BadRequestException(error);
      }
    });

    return {
      successe: true,
    };
  }
}
