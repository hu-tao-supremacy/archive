import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  Answer,
  Event,
  EventDuration,
  Location,
  Organization,
  Question,
  QuestionGroup,
  User,
  UserEvent,
} from './entities';
import { ArchiveModule } from './archive/archive.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [
        UserEvent,
        Event,
        Location,
        EventDuration,
        Organization,
        Question,
        QuestionGroup,
        Answer,
        User,
      ],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ArchiveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
