import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { QuestionGroup } from './question-group.entity';
import { Answer } from './answer.entity';

@Index(['questionGroupId', 'seq'], { unique: true })
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionGroupId: number;

  @ManyToOne(() => QuestionGroup, { onDelete: 'CASCADE' })
  questionGroup: QuestionGroup;

  @Column()
  seq: number;

  @Column('enum', { enum: ['SCALE', 'TEXT'] })
  answerType: string;

  @Column({ default: false })
  isOptional: boolean;

  @Column()
  title: string;

  @Column()
  subtitle: string;
}
