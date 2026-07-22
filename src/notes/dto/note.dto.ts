import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min, MinLength, ValidateNested } from "class-validator";
import {Type} from 'class-transformer';
import { TagsDto } from "./tags.do";
import { IsReadingTimeFive } from "../decorator/reading-time.decorator";

export class NoteDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  content!: string;

  @IsNotEmpty()
  @IsString()
  category!: string;

  @IsNotEmpty()
  @IsBoolean()
  isPinned!: boolean;

  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsOptional()
  @IsString()
  userName!: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsReadingTimeFive()
  readingTime!: number;

  @ValidateNested({ each: true })
  @Type(() => TagsDto)
  tags!: TagsDto[];
}