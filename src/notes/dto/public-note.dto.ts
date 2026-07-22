import { OmitType } from "@nestjs/mapped-types";
import { NoteDto } from "./note.dto";

export class PublicNoteDto extends OmitType(
    NoteDto, 
    ['content'] as const
) {}