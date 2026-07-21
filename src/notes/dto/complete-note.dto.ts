import { AuditDto } from "./audit.dto";
import { NoteDto } from "./note.dto";

export class CompleteNoteDto extends IntersectionType(
    NoteDto, AuditDto
) {}