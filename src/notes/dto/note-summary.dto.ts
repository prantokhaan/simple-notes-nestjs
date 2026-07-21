import { NoteDto } from "./note.dto";

export class NoteSummaryDto extends PickType(
    NoteDto,
    ['title', 'isPinned']
) {}