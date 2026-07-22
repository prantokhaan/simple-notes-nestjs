import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { HealthModule } from './health/health.module';
import { WelcomeModule } from './welcome/welcome.module';
import { ConfigModule } from './global/config/config.module';
import { StatModule } from './stat/stat.module';
import { UsersModule } from './users/users.module';
import { LoggerModule } from './global/logger/logger.module';
import {ConfigModule as ConfigModuleBuilt} from '@nestjs/config'
import * as Joi from 'joi';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { HttpMiddleware } from './shared/middleware/http.middleware';
import { RequestMiddleware } from './shared/middleware/request.middleware';
import { ApiKeyMiddleware } from './shared/middleware/ApiKey.middleware';

@Module({
    imports: [
    ConfigModuleBuilt.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        JWT_SECRET: Joi.string().min(2).required(),
        NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
        DB_HOST: Joi.required(),
        DB_PASSWORD: Joi.required(),
        DB_USER: Joi.required(),
        DB_PORT: Joi.number().optional(),
        APP_NAME: Joi.string().optional()
      })
     }),
    ConfigModule.forRoot({
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
    ConfigModuleBuilt,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes('*')

    consumer
      .apply(LoggerMiddleware, RequestMiddleware)
      .forRoutes('v1/users')

    consumer
      .apply(HttpMiddleware)
      .exclude('v1/notes')
      .forRoutes('*')
  }
}
