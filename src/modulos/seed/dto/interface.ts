import { Cliente } from "src/modulos/clientes/entities/cliente.entity";

export interface Motoif {
    matricula: string;
    marca: string;
    modelo: string;
    cilindrada: number;
    peso: number;
    precio: number;
    dni_propietario: Cliente;
}
