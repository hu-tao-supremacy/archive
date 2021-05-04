import { Controller, Get, Header, Param, Post, Res } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { Response } from 'express';
import { stringify } from 'csv';

@Controller('archive')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  @Get('/:eventId')
  @Header('Content-Type', 'text/csv')
  async generateCSV(@Param('eventId') eventId: number, @Res() res: Response) {
    const exportableObjects = await this.archiveService.makeExportableObjects(
      eventId,
    );
    stringify(exportableObjects, { header: true }).pipe(res);
  }
}
