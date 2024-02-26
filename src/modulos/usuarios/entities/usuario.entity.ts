import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Usuario {
    @PrimaryColumn('text',{
        nullable: false,
    }) 
    userid: string;

    @Column('text',{
        unique: true,
        nullable: true,
    })
    nombre: string;

    @Column('text',{
        unique: false,
        nullable: true,
    })
    username: string;

    @Column('text',{
        unique: true,
        nullable: true,
    })
    contraseña: string;

    @Column({
        unique: false,
        nullable: true,
    })
    email: string;
}
