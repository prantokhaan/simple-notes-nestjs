import { IsNotEmpty, IsString, Max } from "class-validator";

export class TagsDto{
    @IsNotEmpty()
    @IsString()
    @Max(20)
    tag: string;
}