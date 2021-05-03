import { Controller, Get, Param, Post } from '@nestjs/common';
import { ArchiveService } from './archive.service';

@Controller('archive')
export class ArchiveController {
  constructor(private readonly archiveService: ArchiveService) {}

  @Get('/:eventId')
  async generateCSV(@Param('eventId') eventId: number) {
    this.archiveService.getUserEvents(eventId);
    return -1;
  }
}
