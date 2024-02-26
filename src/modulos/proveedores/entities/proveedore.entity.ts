import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Proveedore {
    @PrimaryColumn('text',{
        nullable: false,
    }) 
    cif: string;

    @Column('text',{
        unique: true,
        nullable: true,
    })
    nombre: string;

    @Column('text',{
        unique: false,
        nullable: true,
    })
    localidad: string;

    @Column({
        unique: false,
        nullable: true,
    })
    telefono: string;

}
