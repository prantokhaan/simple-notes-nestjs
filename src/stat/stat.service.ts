import { Injectable } from '@nestjs/common';

@Injectable()
export class StatService {
    private totalNotesCreated: number = 0;
    private totalNotesDeleted: number = 0;
    private totalNotesUpdated: number = 0;

    getNotesCreated(): number {
        return this.totalNotesCreated;
    }

    getNotesDeleted(): number {
        return this.totalNotesDeleted;
    }

    getNotesUpdated(): number {
        return this.totalNotesUpdated;
    }

    updateNotes(which: string): void {
        if(which==='create') this.totalNotesCreated++;
        else if(which==='delete') this.totalNotesDeleted++;
        else this.totalNotesUpdated++;
    }
}
