import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventDuration } from './event-duration.entity';
import { Location } from './location.entity';
import { Organization } from './organization.entity';
import { QuestionGroup } from './question-group.entity';

@Index(['organizationId', 'name'], { unique: true })
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  organizationId: number;

  @ManyToOne(() => Organization, { onDelete: 'CASCADE' })
  organization: Organization;

  @Column({ nullable: true })
  locationId?: number;

  @ManyToOne(() => Location)
  location?: Location;

  @Column()
  description: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  coverImageUrl?: string;

  @Column({ nullable: true })
  coverImageHash?: string;

  @Column({ nullable: true })
  posterImageUrl?: string;

  @Column({ nullable: true })
  posterImageHash?: string;

  @Column()
  attendeeLimit: number;

  @Column({ nullable: true })
  contact?: string;

  @OneToMany(() => QuestionGroup, (questionGroup) => questionGroup.event)
  questionGroups: QuestionGroup[];

  @OneToMany(() => EventDuration, (duration) => duration.event)
  durations: EventDuration[];
}
