import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { HealthModule } from './health/health.module';
import { WelcomeModule } from './welcome/welcome.module';
import { ConfigModule } from './global/config/config.module';
import { StatModule } from './stat/stat.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './global/logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      appName: 'Pranto Notes API',
      maxNotes: 9,
      apiVersion: 'v1',
      environment: 'development',
      readOnlyMode: false,
      database: [
        { id: '1', title: 'NestJS', content: 'Learning NestJS', category: 'programming', userId: '1', isPinned: false, readingTime: 10, tags: ['programming', 'learning'] },
        { id: '2', title: 'TypeScript', content: 'Learning TypeScript', category: 'programming', userId: '2', isPinned: true, readingTime: 20, tags: ['programming', 'learning'] },
        { id: '3', title: 'Love', content: 'Love is Dangerous', category: 'personal', userId: '3', isPinned: true, readingTime: 10, tags: ['programming', 'learning'] },
        { id: '4', title: 'Hate', content: 'Hate is Dangerous', category: 'personal', userId: '1', isPinned: false, readingTime: 15, tags: ['programming', 'learning'] },
      ],
      userDatabase: [
        { id: '1', name: 'pranto', email: 'pranto@note.com' },
        { id: '2', name: 'rob stark', email: 'rob@note.com' },
        { id: '3', name: 'john snow', email: 'john@note.com' },
      ],
    }),
    LoggerModule,
    NotesModule,
    HealthModule,
    WelcomeModule,
    StatModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
