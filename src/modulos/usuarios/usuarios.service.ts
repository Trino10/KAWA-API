import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDTO } from './dto/pagination.dto';

@Injectable()
export class UsuariosService {


  findOneBy(userid: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>
  ) { }

  // INSERTAR USUARIOS

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const usuario = this.usuarioRepository.create(createUsuarioDto);
      await this.usuarioRepository.save(usuario);
      return {
        msg: 'Usuario insertado',
        data: usuario,
        status: 200,
      };
    } catch (error) {
      throw new InternalServerErrorException('Ponte en contacto con el admin');
    }
  }


  // LISTAR TODOS LOS USUARIOS

  async findAll() {
    try {
      const userData = await this.usuarioRepository.find()
      return {
        data: userData,
        message: 'listado de todos los usuarios',
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException("fallo al listar todos los usuarioes")
    }
  }



  //  LISTAR UN USUARIO

  async ListarUno(userid: string) {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { userid }
      })
      return {
        message: "detalles del usuario",
        data: usuario,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('ERROR ._.')
    }
  }


  //  MODIFICAR USUARIOS

  async UpdateUsuario(userid: string, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { userid }
      })
      this.usuarioRepository.merge(usuario, updateUsuarioDto)
      await this.usuarioRepository.save(usuario)
      return {
        message: 'usuario actualizado',
        data: usuario,
        status: 200
      }
    } catch (error) {
      throw new InternalServerErrorException('fallo al actualizar usuario')
    }
  }



  // BORRAR USUARIO

  async remove(userid: string) {
    try {
      const user = await this.usuarioRepository.findOneBy({ userid });
      if (!user) {
        throw new NotFoundException(`Usuario con id: ${userid} no encontrado`);
      }
      return await this.usuarioRepository.remove(user);
    } catch (error) {
      throw new InternalServerErrorException('fallo al borrar el usuario :(')
    }
  }


  // PAGINACIÓN
  
  async Paginat(paginationDto: PaginationDTO) {
    const { limit, offset } = paginationDto;
    return this.usuarioRepository.find({
      take: limit,
      skip: offset
    });
  }


  // BORRAR TODOS LOS USUARIOS
  async deleteAllUsuarios() {
    const query = this.usuarioRepository.createQueryBuilder('usuario');
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
