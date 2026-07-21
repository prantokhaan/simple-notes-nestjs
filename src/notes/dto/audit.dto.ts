import { IsNotEmpty, IsString } from "class-validator";

export class AuditDto {
    @IsNotEmpty()
    @IsString()
    createdBy: string;

    @IsNotEmpty()
    @IsString()
    updatedBy: string;
}