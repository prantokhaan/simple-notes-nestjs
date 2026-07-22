import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { randomUUID } from 'crypto';
import { ConfigOptions } from './config.interface';

@Global()
@Module({})
export class ConfigModule {
  static forRoot(options: ConfigOptions): DynamicModule {
    return {
      module: ConfigModule,
      global: true,
      providers: [
        ConfigService,
        {
          provide: 'ID_GENERATOR',
          useFactory: () => () => randomUUID(),
        },
        {
          provide: 'MAX_NOTES',
          useValue: options.maxNotes,
        },
        {
          provide: 'API_VERSION',
          useValue: options.apiVersion,
        },
        {
          provide: 'ENVIRONMENT',
          useValue: options.environment,
        },
        {
          provide: 'READ_ONLY_MODE',
          useValue: options.readOnlyMode,
        },
        {
          provide: 'APP_NAME',
          useFactory: () => process.env.APP_NAME || 'default',
        },
        {
          provide: 'DATABASE',
          useValue: options.database,
        },
        {
          provide: 'USER_DATABASE',
          useValue: options.userDatabase,
        },
      ],
      exports: [
        ConfigService,
        'ID_GENERATOR',
        'APP_NAME',
        'MAX_NOTES',
        'API_VERSION',
        'ENVIRONMENT',
        'READ_ONLY_MODE',
        'DATABASE',
        'USER_DATABASE',
      ],
    };
  }
}
