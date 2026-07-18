import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    getMaxNotes(): number {
        return 3;
    }

    getApiVersion(): string {
        return "v1";
    }

    getAppName(): string {
        return "Pranto Notes API";
    }

    getEnvironment(): string {
        return "environment";
    }
}
