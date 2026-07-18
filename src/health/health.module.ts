import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  imports: [NotesModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
