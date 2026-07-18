import { Controller, Get } from '@nestjs/common';
import { WelcomeService } from './welcome.service';
import type { Welcome } from './welcome.interface';

@Controller({
    path: 'welcome',
    version: '1'
})
export class WelcomeController {
    constructor(
        private readonly welcome: WelcomeService
    ){}

    @Get()
    getWelcome(): Welcome {
        return this.welcome.getWelcome();
    }
}
