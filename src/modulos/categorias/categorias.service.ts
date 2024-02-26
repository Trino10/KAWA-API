import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Repository } from 'typeorm';
import { PaginationDTO } from '../clientes/dto/pagination.dto';

@Injectable()
export class CategoriasService {

  findOne(catid: string) {
    return this.categoriaRepository.findOne({ where: { catid } });
  }
  
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>
  ) { }

  // INSERTAR CATEGORIA

  async create(createCategoriaDto: CreateCategoriaDto) {
    try {
      const categoria = this.categoriaRepository.create(createCategoriaDto);
      await this.categoriaRepository.save(categoria);
      return {
        msg: 'Categoria insertada',
        data: categoria,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Ponte en contacto con el admin');
    }
  }

  // LISTAR TODOS LOS CATEGORIAS

  async findAll() {
    try {
      const catData = await this.categoriaRepository.find()
      return {
        data: catData,
        message: 'listado de todos los categorias',
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException("fallo al listar todos los categoriaes")
    }
  }

  //  LISTAR UN CATEGORIA

  async ListarUno(catid: string) {
    try {
      const categoria = await this.categoriaRepository.findOne({
        where: { catid }
      })
      return {
        message: "detalles de la categoria",
        data: categoria,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('ERROR ._.')
    }
  }


  //  MODIFICAR CATEGORIA

  async UpdateCategoria(catid: string, updateCategoriaDto: UpdateCategoriaDto) {
    try {
      const categoria2 = await this.categoriaRepository.findOne({
        where: { catid }
      })
      this.categoriaRepository.merge(categoria2, updateCategoriaDto)
      await this.categoriaRepository.save(categoria2)
      return {
        message: 'categoria actualizada',
        data: categoria2,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('fallo al actualizar categoria')
    }
  }


  // BORRAR CATEGORIA

  async remove(catid: string) {
    try {
      const cate = await this.categoriaRepository.findOneBy({ catid });
      if (!cate) {
        throw new NotFoundException(`Categoria ${catid} no encontrado`);
      }
      return await this.categoriaRepository.remove(cate);
    } catch (error) {
      throw new InternalServerErrorException('fallo al borrar categoria')
    }
  }

  // PAGINACIÓN
  
  async Paginat(paginationDto: PaginationDTO) {
    const { limit, offset } = paginationDto;
    return this.categoriaRepository.find({
      take: limit,
      skip: offset
    });
  }

  // BORRAR TODOS LOS CATEGORIA
  async deleteAllCategorias() {
    const query = this.categoriaRepository.createQueryBuilder('categoria');
    try {
      return await query
        .delete()
        .where({})
        .execute()
    } catch (error) {
    }
  }
}
