import { Categoria } from "src/modulos/categorias/entities/categoria.entity";
import { Cliente } from "src/modulos/clientes/entities/cliente.entity";
import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity()
export class Moto {
    @PrimaryColumn('text',{
        nullable: false,
    }) 
    matricula: string;

    @Column('text',{
        unique: false,
        nullable: true,
    })
    marca: string;

    @Column('text',{
        unique: false,
        nullable: true,
    })
    modelo: string;

    @Column('text',{
        unique: false,
        nullable: true,
    })
    foto: string;

    @Column({
        unique: false,
        nullable: true,
    })
    cilindrada: number;

    @Column({
        unique: false,
        nullable: true,
    })
    peso: number;

    @Column({
        unique: false,
        nullable: true,
    })
    precio: number;

    @ManyToOne(
        () => Cliente,
        (fkmotos1) => fkmotos1.dni,
        {cascade:true}
    )
    dni_propietario?: Cliente;

    @ManyToOne(
        () => Categoria,
        (fkmotos2) => fkmotos2.virtu2,
        {cascade:true}
    )
    catid?: Categoria;
}

