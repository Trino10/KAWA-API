import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateCategoriaDto {

    @IsString()
    @MinLength(2)
    catid: string;

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    desc: string;

}
