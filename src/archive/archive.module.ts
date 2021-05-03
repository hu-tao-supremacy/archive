import { Module } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { ArchiveController } from './archive.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event, UserEvent } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([UserEvent, Event])],
  providers: [ArchiveService],
  controllers: [ArchiveController],
})
export class ArchiveModule {}
