import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateMotoDto {
  @IsString()
  @MinLength(2)
  matricula: string;

  @IsString()
  @MinLength(1)
  marca: string;

  @IsString()
  @MinLength(1)
  modelo: string;

  @IsString()
  @MinLength(1)
  foto: string;

  @IsNumber()
  cilindrada: number;

  @IsNumber()
  peso: number;

  @IsNumber()
  precio: number;

  @IsString() // Cambiado de Cliente a string
  @IsOptional()
  dni_propietario?: string; // Cambiado de Cliente a string

  @IsString() // Cambiado de Categoria a string
  @IsOptional()
  catid?: string; // Cambiado de Categoria a string
}
