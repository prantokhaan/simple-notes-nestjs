import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min, ValidateNested } from "class-validator";
import {Type} from 'class-transformer';
import { TagsDto } from "./tags.do";

export class NoteDto {
    @IsNotEmpty()
    @IsString()
    @Max(100)
    title: string;

    @IsNotEmpty()
    @IsString()
    @Min(5)
    content: string;

    @IsNotEmpty()
    @IsString()
    category: string;
    
    @IsNotEmpty()
    @IsBoolean()
    isPinned: boolean;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    userName?: string;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    readingTime: number;

    @ValidateNested()
    @Type(() => TagsDto)
    tags: TagsDto;
}