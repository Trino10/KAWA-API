import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Libro } from '../../libros/entities/libro.entity';

@Entity()
export class Autore {
   
    @PrimaryColumn()
    nif: string;

    @Column('text', { unique: true})
    nombre: string;

    @OneToMany(
      () => Libro,
      (libro) => libro.autor,
      { eager: true }
    )
    libros?: Libro[] //virtual

}
