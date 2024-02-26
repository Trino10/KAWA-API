import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Asumiendo que estás utilizando TypeORM
import { Repository } from 'typeorm'; // Asumiendo que estás utilizando TypeORM
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { Cliente } from './entities/cliente.entity';
// import { Cliente } from './cliente.entity'; // Reemplaza 'cliente.entity' con el nombre real de tu entidad

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  findOne(dni: string) {
    return this.clienteRepository.findOne({ where: { dni } });
  }
  

  async create(createClienteDto: CreateClienteDto) {
    try {
      const cliente = this.clienteRepository.create(createClienteDto);
      await this.clienteRepository.save(cliente);
      return {
        msg: 'Cliente insertado',
        data: cliente,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Ponte en contacto con el administrador');
    }
  }

  //LISTAR UN CLIENTE
  async ListarUno(dni: string) {
    try {
      const cliente = await this.clienteRepository.findOne({
        where: { dni }
      })
      return {
        message: "detalles del cliente",
        data: cliente,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('ERROR ._.')
    }
  }

  //LISTAR TODOS LOS CLIENTES
  async findAll() {
    try {
      const cliData = await this.clienteRepository.find()
      return {
        data: cliData,
        message: 'listado de todos los clientes',
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException("fallo al listar todos los clientees")
    }
  }


  //  MODIFICAR CLIENTE

  async UpdateCliente(dni: string, updateClienteDto: UpdateClienteDto) {
    try {
      const Cliente = await this.clienteRepository.findOne({
        where: { dni }
      })
      this.clienteRepository.merge(Cliente, updateClienteDto)
      await this.clienteRepository.save(Cliente)
      return {
        message: 'cliente actualizado',
        data: Cliente,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('fallo al actualizar cliente')
    }
  }


  // BORRAR CLIENTE

  async remove(dni: string) {
    try {
      const clien = await this.clienteRepository.findOneBy({ dni });
      if (!clien) {
        throw new NotFoundException(`Cliente con dni: ${dni} no encontrado`);
      }
      console.log('cliente eliminado')
      return await this.clienteRepository.remove(clien);
    } catch (error) {
      throw new InternalServerErrorException('fallo al borrar cliente')
    }
  }

  // PAGINACIÓN
  
  async Paginat(paginationDto: PaginationDTO) {
    const { limit, offset } = paginationDto;
    return this.clienteRepository.find({
      take: limit,
      skip: offset
    });
  }



  // BORRAR TODOS LOS CLIENTES
  async deleteAllClientes() {
    const query = this.clienteRepository.createQueryBuilder('cliente');
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
