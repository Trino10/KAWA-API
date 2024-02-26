import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tienda {

   @PrimaryGeneratedColumn('uuid')
   id:string;
   
   @Column('text', {unique: true})
   nombre: string;

   @Column('text', {unique: true})
   localidad: string;

   @Column('int')
   empleados: Number


    // @OneToMany(
    //     () => Libro,
    //     (Libro) => Libro.categoria,
    //     { cascade: false }
    // )
    // libros?:Libro[]

}