import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as flat from 'flat';
import { Event, UserEvent, Question, QuestionGroup } from 'src/entities';
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

    let exports = userEvents.map((userEvent) =>
      this.createExportable(userEvent),
    );

    console.log(JSON.stringify(exports, null, 2));
  }

  createExportable(userEvent: UserEvent) {
    const user = userEvent.user;
    const answers = userEvent.answers;

    let questionGroups = userEvent.event.questionGroups;

    questionGroups.forEach((questionGroup) => {
      questionGroup.questions.sort((a: Question, b: Question) => a.seq - b.seq);
    });

    questionGroups = questionGroups.sort(
      (a: QuestionGroup, b: QuestionGroup) => a.seq - b.seq,
    );

    const exportable: Record<any, any> = {};
    exportable.questions = {};

    questionGroups.forEach((questionGroup) => {
      questionGroup.questions.forEach((question) => {
        exportable.questions[
          `${questionGroup.seq}.${question.seq} - ${questionGroup.title} - ${question.title}`
        ] = answers.find((answer) => answer.questionId === question.id).value;
      });
    });

    exportable.id = userEvent.id;
    exportable.ticket = userEvent.ticket ?? '';
    exportable.status = userEvent.status;

    exportable.user = {
      firstName: user.firstName,
      lastName: user.lastName,
      nickname: user.nickname ?? '',
      chulaId: user.chulaId ?? '',
      gender: user.gender,
      academicYear: user.academicYear ?? '',
      phoneNumber: user.phoneNumber ?? '',
      email: user.email,
      district: user.district ?? '',
      province: user.province ?? '',
      zipCode: user.zipCode ?? '',
      address: user.address ?? '',
    };

    return flat(exportable);
  }
}
