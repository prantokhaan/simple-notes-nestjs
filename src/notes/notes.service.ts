import { Injectable, NotFoundException } from '@nestjs/common';
import type { Note, Stats } from './notes.interface';


@Injectable()
export class NotesService {
    private notes: Note[] = [
        {
            id: 1,
            title: "NestJS",
            content: "Learning NestJS",
            category: "programming",
            isPinned: false
        },
        {
            id: 2,
            title: "TypeScript",
            content: "Learning TypeScript",
            category: "programming",
            isPinned: true
        },
        {
            id: 3,
            title: "Love",
            content: "Love is Dangerous",
            category: "personal",
            isPinned: true
        },
        {
            id: 4,
            title: "Hate",
            content: "Hate is Dangerous",
            category: "personal",
            isPinned: false
        }
    ];
    private nextId: number = 5;


    getAllNotes(): Note[]{
        return this.notes;
    }

    createNote(title: string, content: string, category: string, isPinned: boolean): Note{
        const newNote: Note = {
            id: this.nextId++,
            title,
            content,
            category,
            isPinned
        }

        this.notes.push(newNote);

        return newNote;
    }

    getNoteById(id: number): Note{
        const note = this.notes.find((item) => item.id === id);
        if(!note){
            throw new NotFoundException(`Note with ID ${id} not found.`);
        }

        return note;
    }

    updateNote(id: number, title?: string, content?: string, category?: string, isPinned?: boolean): Note {
        const note = this.getNoteById(id);

        if(title !== undefined) note.title = title;
        if(content !== undefined) note.content = content;
        if(category !== undefined) note.category = category;
        if(isPinned !== undefined) note.isPinned = isPinned;

        return note;
    }

    deleteNote(id: number): Note {
        const note = this.getNoteById(id);

        this.notes = this.notes.filter(
            (ex) => ex.id !== id
        );

        return note;
    }

    searchNotes(keyword: string): Note[] {
        const normalKey = keyword.toLowerCase();

        return this.notes.filter(
            (ex) => ex.content.toLowerCase().includes(normalKey)
        )
    }

    filterCategory(category: string): Note[] {
        return this.notes.filter(
            (ex) => ex.category === category
        )
    }

    pinnedNotes(): Note[] {
        return this.notes.filter(
            (ex) => ex.isPinned
        )
    }

    updatePin(id: number): Note {
        const note = this.getNoteById(id);

        note.isPinned = !note.isPinned;

        return note;
    }

    notesStats(): Stats {
        const notes = this.getAllNotes();
        const totalNotes = notes.length;

        const allPinnedNotes = this.pinnedNotes();
        const pinnedNotes = allPinnedNotes.length;
        const unpinnedNotes = totalNotes - pinnedNotes;

        return {
            totalNotes,
            pinnedNotes,
            unpinnedNotes,
        }
    }

}
