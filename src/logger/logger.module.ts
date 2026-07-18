import { Module } from '@nestjs/common';
import { LoggerController } from './logger.controller';
import { LoggerService } from './logger.service';

@Module({
  exports: [LoggerService, LoggerModule],
  controllers: [LoggerController],
  providers: [LoggerService]
})
export class LoggerModule {}
