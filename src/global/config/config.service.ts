import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ConfigService {
    constructor(
        @Inject('MAX_NOTES') private maxNotes: number,
        @Inject('API_VERSION') private apiVersion: string,
        @Inject('ENVIRONMENT') private environment: string,
        @Inject('READ_ONLY_MODE') private readOnlyMode: boolean,
        @Inject('APP_NAME') private appName: string,
    ) {}

    getMaxNotes(): number {
        return this.maxNotes;
    }

    getApiVersion(): string {
        return this.apiVersion;
    }

    getEnvironment(): string {
        return this.environment;
    }

    getReadOnlyMode(): boolean {
        return this.readOnlyMode;
    }

    getAppName(): string {
        return this.appName;
    }
}
