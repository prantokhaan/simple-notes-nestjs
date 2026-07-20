import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { Info, Note, Stats } from './notes.interface';
import { LoggerService } from 'src/global/logger/logger.service';
import { StatService } from 'src/stat/stat.service';
import { Stat } from 'src/stat/stat.interface';
import { Users } from 'src/users/users.interface';


@Injectable()
export class NotesService {

    constructor(
        @Inject('APP_NAME') private readonly appName: string,
        @Inject('MAX_NOTES') private readonly maxNotes: number,
        @Inject('API_VERSION') private readonly apiVersion: string,
        @Inject('READ_ONLY_MODE') private readonly readOnlyMode: boolean,
        @Inject('ID_GENERATOR') private readonly idGen: () => string,
        @Inject('DATABASE') private notes: Note[],
        @Inject('USER_DATABASE') private users: Users[],
        private readonly logger: LoggerService,
        private readonly stat: StatService
    ) {}


    getAllNotes(): Note[]{
        if(this.notes.length > this.maxNotes){
            throw new ConflictException({
                message: "Maximum note limit reached"
            });
        }
        const userNotes: Note[] = [];

        this.notes.forEach(e => {
            const user = this.users.find((u) => u.id === e.userId);
            const note: Note = {
                ...e,
                userName: user?.name,
            }
            console.log("Got Users with: ", userNotes);
            userNotes.push(note);
        });

        return userNotes;
    }

    createNote(title: string, content: string, category: string, isPinned: boolean, userId: string): Note{
        if(this.readOnlyMode){
            this.logger.error("Read Only Mode is on, new note entry restricted");
            throw new ConflictException({
                message: "read only mode is on, no new note can be added"
            })
        }

        const newNote: Note = {
            id: this.idGen(),
            title,
            content,
            category,
            isPinned,
            userId
        }

        this.notes.push(newNote);

        this.stat.updateNotes('create');

        this.logger.createLog("New Note Added Successfully")

        this.logger.log("New Note Added Successfully");

        return newNote;
    }

    getNoteById(id: string): Note{
        const note = this.notes.find((item) => item.id === id);
        if(!note){
            throw new NotFoundException(`Note with ID ${id} not found.`);
        }

        return note;
    }

    updateNote(id: string, title?: string, content?: string, category?: string, isPinned?: boolean): Note {
        const note = this.getNoteById(id);

        if(title !== undefined) note.title = title;
        if(content !== undefined) note.content = content;
        if(category !== undefined) note.category = category;
        if(isPinned !== undefined) note.isPinned = isPinned;

        this.stat.updateNotes('update');

        return note;
    }

    deleteNote(id: string): Note {
        const note = this.getNoteById(id);

        this.notes = this.notes.filter(
            (ex) => ex.id !== id
        );

        this.stat.updateNotes('delete');

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

    updatePin(id: string): Note {
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

    notesStat(): Stat {
        return {
            totalNotesCreated: this.stat.getNotesCreated(),
            totalNotesDeleted: this.stat.getNotesDeleted(),
            totalNotesUpdated: this.stat.getNotesUpdated()
        }
    }

    getNotesName(): Info {
        return {
            appName: this.appName,
        }
    }

    getApiVersion(): Info {
        return {
            appName: this.appName,
            version: this.apiVersion
        }
    }

    getUsersNotes(userId: string): Note[] {
        return this.notes.filter(
            (e) => e.userId === userId
        )
    }

}
