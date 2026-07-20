import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { StatModule } from 'src/stat/stat.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [StatModule, UsersModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
