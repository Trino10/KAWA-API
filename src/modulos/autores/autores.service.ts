import { Injectable, InternalServerErrorException, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAutoreDto } from './dto/create-autore.dto';
import { UpdateAutoreDto } from './dto/update-autore.dto';
import { Autore } from './entities/autore.entity';

@Injectable()
export class AutoresService {
  constructor(
    @InjectRepository(Autore)
    private readonly autorRepository: Repository<Autore>
  ){

  }
  @Post()
  async create(createAutoreDto: CreateAutoreDto) {
    try {
      //el objeto (createAutoreDto) del controlador 
      //lo PREPARA en el onjeto (autor) para ser INSERTADO en el SGBD
      const autor = this.autorRepository.create(createAutoreDto);
    

      //lanza la petición de insercción a la BD
      //Mapea Objeto autor <--> registro autor
      //Genera el SQL insert into Autor(isbb, nombre) values ("1", "Glen Smidth");
      //aplica la libreria de bd instalada en el proyecto --> libreria de postgress (pg) 
      await this.autorRepository.save(autor);
      return {
        msg: 'Registro Insertado',
        data: autor,
        status: 200
      }
    }catch(error){
      console.log(error);
      throw new InternalServerErrorException('Pongase en contacto con el Sysadmin')
    }
  
  }

  findAll() {
    return `This action returns all autores`;
  }

  findOne(nif: string) {
    const autor= this.autorRepository.findOne({
      where:{
        nif
      }
    });
    return autor;
  }

  @Patch()
  update(id: number, updateAutoreDto: UpdateAutoreDto) {
    return `This action updates a #${id} autore`;
  }

  remove(id: number) {
    return `This action removes a #${id} autore`;
  }

  async deleteAllAutores(){
    const query = this.autorRepository.createQueryBuilder('autor');
    try{
      return await query  
        .delete()
        .where({})
        .execute()
    }catch(error){
      throw new InternalServerErrorException('sysadmin ...')
    }
  }
}
