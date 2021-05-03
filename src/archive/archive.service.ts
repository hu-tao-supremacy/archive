import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event, UserEvent } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ArchiveService {
  constructor(
    @InjectRepository(Event) private eventRepository: Repository<Event>,
    @InjectRepository(UserEvent)
    private userEventRepository: Repository<UserEvent>,
  ) {}

  async getUserEvents(eventId: number) {
    const userEvents = await this.userEventRepository.find({
      where: { eventId },
      relations: [
        'user',
        'event',
        'answers',
        'event.questionGroups',
        'event.questionGroups.questions',
      ],
    });

    console.log(JSON.stringify(userEvents, null, 2));
  }
}
