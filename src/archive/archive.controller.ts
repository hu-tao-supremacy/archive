import { Controller, Get, Header, Param, Post, Res } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { Response } from 'express';
import { stringify } from 'csv';
import { nanoid } from 'nanoid';

@Controller('archive')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  @Get('/:archiveKey')
  @Header('Content-Type', 'text/csv')
  async generateCSV(
    @Param('archiveKey') archiveKey: string,
    @Res() res: Response,
  ) {
    const eventId = this.archiveService.getEventId(archiveKey);
    const exportableObjects = await this.archiveService.makeExportableObjects(
      eventId,
    );

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=' + nanoid() + '.csv',
    );
    stringify(exportableObjects, { header: true }).pipe(res);
  }
}
