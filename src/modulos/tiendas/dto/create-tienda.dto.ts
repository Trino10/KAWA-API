import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateTiendaDto {

    @IsString()
    @MinLength(10)
    nombre: string;

    @IsString()
    @MinLength(10)
    localidad: string;

    @IsNumber()
    @MinLength(1)
    empleados: Number;
    
}
