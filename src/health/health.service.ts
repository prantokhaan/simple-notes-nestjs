import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Info } from 'src/notes/notes.interface';

@Injectable()
export class HealthService {

    constructor(
        @Inject('MAX_NOTES') private readonly maxNotes: number,
        @Inject('API_VERSION') private readonly apiVersion: string,
        @Inject('ENVIRONMENT') private readonly environment: string,
        @Inject('READ_ONLY_MODE') private readonly readOnlyMode: boolean,
        private readonly config: ConfigService
    ){}

    getHealth(): Info {
        return {
            status: "ok",
            appName: this.config.getOrThrow('APP_NAME'),
            version: this.apiVersion,
            environment: this.environment,
            maxNotes: this.maxNotes,
            isReadOnly: this.readOnlyMode
        }
    }
}
