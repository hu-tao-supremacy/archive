import {
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer.entity';
import { Event } from './event.entity';
import { User } from './user.entity';

@Index(['userId', 'eventId'], { unique: true })
@Index(['eventId', 'ticket'], { unique: true })
@Entity()
export class UserEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  eventId: number;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  event: Event;

  @OneToMany(() => Answer, (answer) => answer.userEvent)
  answers: Answer[];

  @Column({ nullable: true })
  rating?: number;

  @Column({ nullable: true })
  ticket?: string;

  @Column('enum', { enum: ['PENDING', 'APPROVED', 'REJECTED'] })
  status: string;

  @Column('boolean')
  isInternal: boolean;
}
