import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service';
import type { Info } from 'src/notes/notes.interface';

@Controller({
    path: 'health',
    version: '1',
})
export class HealthController {
    constructor(
        private readonly health: HealthService
    ){}

    @Get()
    getHealth(): Info {
        return this.health.getHealth();
    }
}
