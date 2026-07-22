import { Inject, Injectable } from '@nestjs/common';
import { Welcome } from './welcome.interface';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class WelcomeService {
    constructor(
        private readonly configService: ConfigService
    ){}

    getWelcome(): Welcome {
        const appName = this.configService.getOrThrow('APP_NAME');
        return {
            message: `Welcome to the ${appName}`,
            time: new Date().toISOString()
        }
    }
}
