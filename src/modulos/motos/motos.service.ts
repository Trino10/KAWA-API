import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateMotoDto } from './dto/create-moto.dto';
import { UpdateMotoDto } from './dto/update-moto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Moto } from './entities/moto.entity';
import { DeepPartial, Repository } from 'typeorm';
import { ClientesService } from '../clientes/clientes.service';
import { CategoriasService } from '../categorias/categorias.service';

@Injectable()
export class MotosService {
  constructor(
    @InjectRepository(Moto)
    private readonly motoRepository: Repository<Moto>,
    private clienteService:ClientesService,
    private categoriasService:CategoriasService
  ) {}

  async create(createMotoDto: CreateMotoDto) {
    try {
      const { dni_propietario, catid, ...campos } = createMotoDto;
      const cate = this.motoRepository.create({ ...campos });
      const propietarioId = dni_propietario; 
      const categoriaId = catid; // Asegúrate de que catid sea un string
      const propietario = await this.clienteService.findOne(propietarioId);
      const categoria = await this.categoriasService.findOne(categoriaId);
  
      cate.dni_propietario = propietario;
      cate.catid = categoria;
  
      await this.motoRepository.save(cate);
  
      return {
        status: 200,
        msg: 'Registro insertado'
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('sysadmin...');
    }
  }
  
  // LISTAR TODAS LAS MOTOS

  async findAll() {
    try {
      const motos = await this.motoRepository.find({
        relations: ['dni_propietario', 'catid'],
      });

      return {
        data: motos,
        message: 'Listado de todas las motos con relaciones cargadas',
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Fallo al listar todas las motos con relaciones');
    }
  }

  //  LISTAR UNA MOTO

  async ListarUno(matricula: string) {
    try {
      const moto = await this.motoRepository.findOne({
        where: { matricula }
      })
      return {
        message: "detalles de la moto",
        data: moto,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('ERROR ._.')
    }
  }


  //  MODIFICAR MOTOS

  async UpdateProveedor(matricula: string, updateMotoDto: UpdateMotoDto) {
    try {
      const moto2 = await this.motoRepository.findOne({
        where: { matricula }
      });
  
      const { dni_propietario, catid, ...rest } = updateMotoDto;
  
      const partialMoto: DeepPartial<Moto> = { ...rest };
  
      if (dni_propietario) {
        const cliente = await this.clienteService.findOne(dni_propietario);
        if (cliente) {
          partialMoto.dni_propietario = cliente;
        }
      }
  
      if (catid) {
        const categoria = await this.categoriasService.findOne(catid);
        if (categoria) {
          partialMoto.catid = categoria;
        }
      }
  
      this.motoRepository.merge(moto2, partialMoto);
      await this.motoRepository.save(moto2);
  
      return {
        message: 'moto actualizada',
        data: moto2,
        status: 200
      };
    } catch (error) {
      throw new InternalServerErrorException('fallo al actualizar proveedor');
    }
  }
  
  

  // BORRAR MOTOS

  async remove(matricula: string) {
    try {
      const prove = await this.motoRepository.findOneBy({ matricula });
      if (!prove) {
        throw new NotFoundException(`Proveedor ${matricula} no encontrado`);
      }
      return await this.motoRepository.remove(prove);
    } catch (error) {
      throw new InternalServerErrorException('fallo al borrar proveedor')
    }
  }

    // BORRAR TODAS LAS MOTOS
  async deleteAllMotos() {
    const query = this.motoRepository.createQueryBuilder('moto');
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
