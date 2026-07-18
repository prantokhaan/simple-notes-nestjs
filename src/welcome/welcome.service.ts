import { Inject, Injectable } from '@nestjs/common';
import { Welcome } from './welcome.interface';

@Injectable()
export class WelcomeService {
    constructor(
        @Inject('APP_NAME') private readonly appName: string
    ){}

    getWelcome(): Welcome {
        return {
            message: `Welcome to the ${this.appName}`,
            time: new Date().toISOString()
        }
    }
}
