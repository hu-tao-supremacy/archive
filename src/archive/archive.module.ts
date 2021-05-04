import { Module } from '@nestjs/common';
import { ArchiveService } from './archive.service';
import { ArchiveController } from './archive.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event, UserEvent } from 'src/entities';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    TypeOrmModule.forFeature([UserEvent, Event]),
  ],
  providers: [ArchiveService],
  controllers: [ArchiveController],
})
export class ArchiveModule {}
