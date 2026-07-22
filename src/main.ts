import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';

const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env.development';
dotenv.config({ path: join(process.cwd(), envFile) });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(morgan('tiny'));
  app.use(helmet());
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )
  const port = process.env.PORT ?? 5000;
  const server = await app.listen(port);
  console.log(`Backend started successfully on port ${server.address().port}`);
}
bootstrap();
