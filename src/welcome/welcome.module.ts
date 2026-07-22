import { Module } from '@nestjs/common';
import { WelcomeController } from './welcome.controller';
import { WelcomeService } from './welcome.service';
import { NotesModule } from 'src/notes/notes.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [NotesModule, ConfigModule],
  controllers: [WelcomeController],
  providers: [WelcomeService]
})
export class WelcomeModule {}
