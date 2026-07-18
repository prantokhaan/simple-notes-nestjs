import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post, Put, Query, StreamableFile } from '@nestjs/common';
import { NotesService } from './notes.service';
import type { Info, Note, Stats } from './notes.interface';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller({
    path: "notes",
    version: "1"
})
export class NotesController {
    constructor(
        private readonly notesService: NotesService
    ) {}

    @Get()
    filterCategory(
        @Query('category') category: string
    ): Note[] {
        if (category) return this.notesService.filterCategory(category);
        return this.notesService.getAllNotes();
    }

    @Post()
    createNote(
        @Body() body: {title: string, content: string, category: string, isPinned: boolean}
    ): Note {
        return this.notesService.createNote(body.title, body.content, body.category, body.isPinned);
    }

    @Get("search")
    searchNotes(
        @Query('keyword') keyword: string
    ): Note[] {
        return this.notesService.searchNotes(keyword);
    }

    @Get("pinned")
    pinnedNotes(): Note[] {
        return this.notesService.pinnedNotes();
    }

    @Get('export')
    noteDownload() {
        const filepath = join(process.cwd(), "test.txt");
        const file = createReadStream(filepath);

        return new StreamableFile(file, {
            type: "text/plain",
            disposition: 'attachment; filename="test.txt'
        });
    }

    @Get('stats')
    noteStats(): Stats {
        return this.notesService.notesStats();
    }

    @Get('info')
    getNotesName(): Info {
        return this.notesService.getNotesName();
    }

    @Get('version')
    getApiVersion(): Info {
        return this.notesService.getApiVersion();
    }

    @Get(":id")
    getNoteById(
        @Param('id', ParseIntPipe) id: number,
    ): Note {
        return this.notesService.getNoteById(id);
    }

    @Put(":id")
    updateNote(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: {title: string, content: string, category: string, isPinned: boolean}
    ): Note {
        return this.notesService.updateNote(id, body.title, body.content, body.category, body.isPinned);
    }

    @Delete(":id")
    deleteNote(
        @Param('id', ParseIntPipe) id: number
    ): Note {
        return this.notesService.deleteNote(id);
    }

    

    

    

    @Patch(':id/pin')
    updatePin(
        @Param('id', ParseIntPipe) id: number,
    ): Note {
        return this.notesService.updatePin(id);
    }

    
}
