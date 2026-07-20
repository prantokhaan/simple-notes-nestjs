import { Global, Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';

@Global()
@Module({
  exports: [LoggerService, LoggerModule],
  controllers: [LoggerController],
  providers: [LoggerService]
})
export class LoggerModule {}
