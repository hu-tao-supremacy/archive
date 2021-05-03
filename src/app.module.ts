import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Answer, Question, QuestionGroup, UserEvent } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [UserEvent, Event, Question, QuestionGroup, Answer],
      synchronize: false,
      namingStrategy: new SnakeNamingStrategy(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
