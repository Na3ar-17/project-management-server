import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpException,
  HttpStatus,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileStorage } from '../storage';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}
  //TODO create normal file type validation

  @Post('upload')
  @Auth()
  @UseInterceptors(FileInterceptor('image', { storage: fileStorage }))
  uploadImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.(jpeg|jpg|png)',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    image: Express.Multer.File,
  ) {
    return this.filesService.uploadImage(image);
  }
}
