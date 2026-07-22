import { IsNotEmpty, IsString, Max, MaxLength } from "class-validator";

export class TagsDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  tag!: string;
}