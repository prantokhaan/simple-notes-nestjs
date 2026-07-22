import { PickType } from "@nestjs/mapped-types";
import { NoteDto } from "./note.dto";

export class NoteSummaryDto extends PickType(
    NoteDto,
    ['title', 'isPinned'] as const
) {}