import { profile } from "console";
import { BeforeInsert, Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Autore } from '../../autores/entities/autore.entity';

@Entity()
export class Libro {

    @PrimaryColumn('text', { 
        unique: true,
    })
    isbn: string;

    @Column('text', { 
        unique: true
    })
    title: string;

    @Column({
        type: 'int',
        default: 0
    } )
    pageCount: number;

    @Column('numeric', {
        nullable: true
    })
    precio: number;

    @Column('date')
    publishedDate?: string;

    @Column('text' )
    thumbnailUrl?: string;

    @Column('text',{
        nullable: true
    } )
    shortDescription?: string;

    @Column('text', {
        nullable: true
    } )
    longDescription?: string;

    @Column('text' )
    status: string;

   

    // @ManyToOne(
    //     () => Cliente,
    //     (cliente) => cliente.libros,
    //     { cascade: false }
    // )
    // cliente?: Cliente

    // @ManyToOne(
    //     () => Categoria,
    //     (categoria) => categoria.libros,
    //     { cascade: false }
    // )
    // categoria?:Categoria
    
    @ManyToOne(
        () => Autore,
        (autor) => autor.libros,
        {cascade: true}
    )
    autor?: Autore








    @BeforeInsert()
    checkTitle(){
        this.title = this.title.toUpperCase()
    }

    @BeforeInsert()
    precioIva(){
        this.precio = this.precio*1.21;
    }







}