import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { ConfigService } from 'src/config/config.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  exports: ['APP_NAME', 'MAX_NOTES', 'API_VERSION', 'ENVIRONMENT'],
  controllers: [NotesController],
  providers: [NotesService, 
    {
      provide: 'APP_NAME',
      inject: [ConfigService],
      useFactory: (config: ConfigService): string => {
        return config.getAppName();
      }
    },
    {
      provide: 'MAX_NOTES',
      inject: [ConfigService],
      useFactory: (configService: ConfigService): number => {
        return configService.getMaxNotes();
      }
    },
    {
      provide: 'API_VERSION',
      inject: [ConfigService],
      useFactory: (config: ConfigService): string => {
        return config.getApiVersion();
      }
    },
    {
      provide: 'ENVIRONMENT',
      inject: [ConfigService],
      useFactory: (config: ConfigService): string => {
        return config.getEnvironment();
      }
    },
    {
      provide: 'READ_ONLY_MODE',
      useValue: false,
    }
  ]
})
export class NotesModule {}
