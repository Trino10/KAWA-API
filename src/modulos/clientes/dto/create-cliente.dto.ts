import { IsString, MinLength } from "class-validator";

export class CreateClienteDto {
    @IsString()
    @MinLength(2)
    dni: string;

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    fnac: string;

    @IsString()
    @MinLength(1)
    localidad: string;

    @IsString()
    telefono: string;
}
