import { NoteDto } from "./note.dto";

export class PublicNoteDto extends OmitType(
    NoteDto, 
    ['content']
) {}