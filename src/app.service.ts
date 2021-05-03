import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }
}
