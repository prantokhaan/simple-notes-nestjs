import { Module } from '@nestjs/common';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';
import { StatModule } from 'src/stat/stat.module';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [StatModule, UsersModule, ConfigModule],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
