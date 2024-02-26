import { IsString, MinLength } from "class-validator";

export class CreateCategoriaDto {

    @IsString()
    @MinLength(10)
    name: string;

    @IsString()
    @MinLength(10)
    descripcion: string;

    @IsString()
    @MinLength(10)
    logo: string;
    

}