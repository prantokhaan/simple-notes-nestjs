import { Module } from '@nestjs/common';
import { WelcomeController } from './welcome.controller';
import { WelcomeService } from './welcome.service';
import { NotesModule } from 'src/notes/notes.module';

@Module({
  imports: [NotesModule],
  controllers: [WelcomeController],
  providers: [WelcomeService]
})
export class WelcomeModule {}
