import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { Proveedore } from './entities/proveedore.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDTO } from './dto/pagination.dto';

@Injectable()
export class ProveedoresService {

  findOneBy(cif: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Proveedore)
    private readonly proveedorRepository: Repository<Proveedore>
  ) { }

  // INSERTAR PROVEEDORES

  async create(createProveedoreDto: CreateProveedoreDto) {
    try {
      const proveedor = this.proveedorRepository.create(createProveedoreDto);
      await this.proveedorRepository.save(proveedor);
      return {
        msg: 'Registro insertado',
        data: proveedor,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Ponte en contacto con el admin');
    }
  }

  // LISTAR TODOS LOS PROVEEDORES

  async findAll() {
    try {
      const catData = await this.proveedorRepository.find()
      return {
        data: catData,
        message: 'listado de todos los proveedores',
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException("fallo al listar todos los proveedores")
    }
  }

  //  LISTAR UN PROVEEDOR

  async ListarUno(cif: string) {
    try {
      const proveedor = await this.proveedorRepository.findOne({
        where: { cif }
      })
      return {
        message: "detalles del proveedor",
        data: proveedor,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('ERROR ._.')
    }
  }


  //  MODIFICAR PROVEEDORES

  async UpdateProveedor(cif: string, updateProveedorDto: UpdateProveedoreDto) {
    try {
      const proveedor = await this.proveedorRepository.findOne({
        where: { cif }
      })
      this.proveedorRepository.merge(proveedor, updateProveedorDto)
      await this.proveedorRepository.save(proveedor)
      return {
        message: 'proveedor actualizado',
        data: proveedor,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('fallo al actualizar proveedor')
    }
  }

  // BORRAR PROVEEDOR

  async remove(cif: string) {
    try {
      const prove = await this.proveedorRepository.findOneBy({ cif });
      if (!prove) {
        throw new NotFoundException(`Proveedor ${cif} no encontrado`);
      }
      return await this.proveedorRepository.remove(prove);
    } catch (error) {
      throw new InternalServerErrorException('fallo al borrar proveedor')
    }
  }

  // PAGINACIÓN
  
  async Paginat(paginationDto: PaginationDTO) {
    const { limit, offset } = paginationDto;
    return this.proveedorRepository.find({
      take: limit,
      skip: offset
    });
  }

  // BORRAR TODOS LOS PROVEEDORES
  async deleteAllProveedore() {
    const query = this.proveedorRepository.createQueryBuilder('proveedor');
    try {
      return await query
        .delete()
        .where({})
        .execute()
    } catch (error) {
      throw new InternalServerErrorException('Ponte en contacto con el administrador ...')
    }
  }

}
