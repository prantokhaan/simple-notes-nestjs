import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import { HealthModule } from './health/health.module';
import { WelcomeModule } from './welcome/welcome.module';

@Module({
  imports: [NotesModule, HealthModule, WelcomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
