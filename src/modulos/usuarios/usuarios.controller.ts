import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginationDTO } from './dto/pagination.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  // INSERTAR
  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    console.log('usuario creado')
    return this.usuariosService.create(createUsuarioDto);
  }

  // LISTAR TODOS
  @Get('listar')
  findAll() {
    return this.usuariosService.findAll();
  }

  // LISTAR UNO
  @Get(':userid')
  ListarUno(@Param('userid') userid: string) {
    return this.usuariosService.ListarUno(userid);
  }

  // MODIFICAR
  @Patch(':userid')
  update(@Param('userid') userid: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.UpdateUsuario(userid, updateUsuarioDto);
  }

  // BORRAR
  @Delete(':userid')
  remove(@Param('cuseridif') userid: string) {
    return this.usuariosService.remove(userid);
  }


  // PAGINACIÓN
  @Get()									
  Paginat(@Query() paginationDto: PaginationDTO) {
      console.log(paginationDto);
      return this.usuariosService.Paginat(paginationDto);
  }
  
}
