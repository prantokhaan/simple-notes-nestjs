import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoggerService } from './logger.service';
import type { Logs } from './logger.interface';

@Controller({
    path: 'logger',
    version: '1'
})
export class LoggerController {
    constructor(
        private readonly logger: LoggerService
    ){}

    @Post()
    createLog(
        @Body() body: {message: string}
    ): Logs {
        return this.logger.createLog(body.message);
    }

    @Get()
    getAllLogs(): Logs[] {
        return this.logger.getAllLogs();
    }
}
