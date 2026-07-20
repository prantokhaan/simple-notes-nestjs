import { Injectable } from '@nestjs/common';
import { Logs } from './logger.interface';

@Injectable()
export class LoggerService {
    private logs: Logs[] = [
        {
            id: 1,
            message: "Test Log 1"
        },
        {
            id: 2,
            message: "Test Log 2"
        }
    ]

    private logId: number = 3;

    log(message: string){
        console.log(`Log: ${message}`);
    }

    warn(message: string){
        console.log(`Warning: ${message}`)
    }

    error(message: string){
        console.log(`Error: ${message}`)
    }

    createLog(message: string): Logs {
        const newLog = {
            id: this.logId++,
            message,
        }

        this.logs.push(newLog);

        return newLog;
    }

    getAllLogs(): Logs[] {
        return this.logs;
    }
}
