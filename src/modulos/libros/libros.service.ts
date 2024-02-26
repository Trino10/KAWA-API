import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLibroDto } from './dto/create-libro.dto';
import { UpdateLibroDto } from './dto/update-libro.dto';
import { Libro } from './entities/libro.entity';
import { Repository } from 'typeorm';
import { Autore } from '../autores/entities/autore.entity';
import { AutoresService } from '../autores/autores.service';

@Injectable()
export class LibrosService {
  
  constructor(
    @InjectRepository(Libro)
    private readonly librosRepository: Repository<Libro>,
    private readonly autoresServie: AutoresService
    ){

  }
  async create(createLibroDto: CreateLibroDto) {
    try{
        const {autor, ...campos } = createLibroDto; //ES6
        const libro = this.librosRepository.create({...campos});
        const autorobj = await this.autoresServie.findOne(autor);
        libro.autor = autorobj; //direccion del objeto autor relacionado
        console.log(libro);
        await this.librosRepository.save(libro);
    
        return {
          status: 200,
          data: libro,
          msg: 'Libro insertado correctamente'
        };
    }catch(error){
      return new InternalServerErrorException('Error en BD');
    }
    
  }

  findOne(isbn: string) {
    const autor= this.librosRepository.findOne({
      where:{
        isbn
      },
      relations: {
        autor: true,
      }
    });
    return autor;
  }

  update(id: number, updateLibroDto: UpdateLibroDto) {
    return `This action updates a #${id} libro`;
  }

  remove(id: number) {
    return `This action removes a #${id} libro`;
  }

  async findAll() {
    try {
      const catData = await this.librosRepository.find()
      return catData
    } catch (error) {
      throw new InternalServerErrorException("fallo al listar todos los categoriaes")
    }
  }
}
