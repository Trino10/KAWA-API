import { Injectable } from '@nestjs/common';
//servicios
import { AutoresService } from '../autores/autores.service';
//archivos json
import * as seedAutores from '../seed/data/authors.json';
import * as seedCategorias from '../seed/data/categorias.json';

import * as seedLibros from '../seed/data/libros.json';
//interfaces
import { Autor } from '../autores/interfaces/autor.interface';
import { CreateAutoreDto } from '../autores/dto/create-autore.dto';
import { Categoria } from '../categorias/entities/categoria.entity';
import { CategoriasService } from '../categorias/categorias.service';


@Injectable()
export class SeedService {
    constructor (
        private readonly autoreService: AutoresService,
        private readonly categoriasStervice: CategoriasService,
        //private readonly librosService: LibrosService,
            
    ){}
    
    public async loadData(){
     //   await this.insertNewCategorias();
        await this.insertNewAutores();
    }

    private async insertNewCategorias(){
        const insertPromisesCategorias = [];
        seedCategorias.forEach( (categoria: Categoria) => {
            console.log(categoria);
            insertPromisesCategorias.push(this.categoriasStervice.create(categoria))
        })
    }
    private  async insertNewAutores(){
    //    await this.autoreService.deleteAllAutores();
        const insertPromisesAutores = [];
        seedAutores.forEach( (autor: CreateAutoreDto)  => {
           insertPromisesAutores.push(this.autoreService.create(autor));
        });
        const results = await Promise.all(insertPromisesAutores);
        return true;
    }
}
