import { Inject, Injectable } from '@nestjs/common';
import type { Info } from 'src/notes/notes.interface';

@Injectable()
export class HealthService {

    constructor(
        @Inject('APP_NAME') private readonly appName: string,
        @Inject('MAX_NOTES') private readonly maxNotes: number,
        @Inject('API_VERSION') private readonly apiVersion: string,
        @Inject('ENVIRONMENT') private readonly environment: string
    ){}

    getHealth(): Info {
        return {
            status: "ok",
            appName: this.appName,
            version: this.apiVersion,
            environment: this.environment
        }
    }
}
