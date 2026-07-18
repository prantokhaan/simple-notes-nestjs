import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { ConfigService } from 'src/config/config.service';
import { ConfigModule } from 'src/config/config.module';
import { LoggerModule } from 'src/logger/logger.module';
import { randomUUID } from 'crypto';
import { StatModule } from 'src/stat/stat.module';
import { Note } from './notes.interface';

@Module({
  imports: [ConfigModule, LoggerModule, StatModule],
  exports: ['APP_NAME', 'MAX_NOTES', 'API_VERSION', 'ENVIRONMENT', 'READ_ONLY_MODE'],
  controllers: [NotesController],
  providers: [
    NotesService,
    {
      provide: 'APP_NAME',
      inject: [ConfigService],
      useFactory: (config: ConfigService): string => {
        return config.getAppName();
      },
    },
    {
      provide: 'MAX_NOTES',
      inject: [ConfigService],
      useFactory: (configService: ConfigService): number => {
        return configService.getMaxNotes();
      },
    },
    {
      provide: 'API_VERSION',
      inject: [ConfigService],
      useFactory: (config: ConfigService): string => {
        return config.getApiVersion();
      },
    },
    {
      provide: 'ENVIRONMENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService): string => {
        return config.getEnvironment();
      },
    },
    {
      provide: 'READ_ONLY_MODE',
      useValue: false,
    },
    {
      provide: 'ID_GENERATOR',
      useFactory: () => {
        return (): string => randomUUID();
      },
    },
    {
      provide: 'DATABASE',
      useFactory: (): Note[] => {
        return [
          {
            id: '1',
            title: 'NestJS',
            content: 'Learning NestJS',
            category: 'programming',
            isPinned: false,
          },
          {
            id: '2',
            title: 'TypeScript',
            content: 'Learning TypeScript',
            category: 'programming',
            isPinned: true,
          },
          {
            id: '3',
            title: 'Love',
            content: 'Love is Dangerous',
            category: 'personal',
            isPinned: true,
          },
          {
            id: '4',
            title: 'Hate',
            content: 'Hate is Dangerous',
            category: 'personal',
            isPinned: false,
          },
        ];
      },
    },
  ],
})
export class NotesModule {}
