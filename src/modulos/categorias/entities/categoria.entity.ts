import { Moto } from "src/modulos/motos/entities/moto.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class Categoria {
    
    @PrimaryColumn('text',{
        nullable: false,
    }) 
    catid: string;

    @Column('text',{
        unique: true,
        nullable: true,
    })
    nombre: string;

    @Column('text',{
        unique: true,
        nullable: true,
    })
    desc: string;

    @OneToMany(
        () => Moto,
        (fkvirtu2) => fkvirtu2.catid
    )
    virtu2?: Moto[] //virtual
}
