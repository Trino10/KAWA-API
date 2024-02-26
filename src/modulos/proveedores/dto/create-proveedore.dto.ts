import { IsNumber, IsString, MinLength  } from "class-validator";

export class CreateProveedoreDto {
    @IsString()
    @MinLength(2)
    cif: string;

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    @MinLength(1)
    localidad: string;

    @IsString()
    telefono: string;
}
