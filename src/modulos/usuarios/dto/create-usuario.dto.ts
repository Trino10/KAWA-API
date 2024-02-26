import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateUsuarioDto {

    @IsString()
    @MinLength(2)
    userid: string;

    @IsString()
    @MinLength(1)
    nombre: string;

    @IsString()
    username: string;

    @IsString()
    @MinLength(4)
    contraseña: string;

    @IsString()
    @MinLength(1)
    email: string;
}
