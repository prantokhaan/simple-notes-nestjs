import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { NotesModule } from 'src/notes/notes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [NotesModule, ConfigModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
