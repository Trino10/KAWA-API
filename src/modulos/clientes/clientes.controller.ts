import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  // INSERTAR
  // @Post()
  // create(@Body() createClienteDto: CreateClienteDto) {
  //   console.log('Cliente creado')
  //   return this.clientesService.create(createClienteDto);
  // }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createClienteDto: CreateClienteDto){
    return this.clientesService.create(createClienteDto)
  }

  // LISTAR TODOS
  @Get('listar')
  findAll() {
    return this.clientesService.findAll();
  }

  // LISTAR UNO
  @Get(':dni')
  ListarUno(@Param('dni') dni: string) {
    return this.clientesService.ListarUno(dni);
  }


  // MODIFICAR
  @Patch(':dni')
  update(@Param('dni') dni: string, @Body() updateClienteDto: UpdateClienteDto) {
    return this.clientesService.UpdateCliente(dni, updateClienteDto);
  }

  // BORRAR
  @Delete(':dni')
  remove(@Param('dni') dni: string) {
    return this.clientesService.remove(dni);
  }

  // PAGINACIÓN
  @Get()									
  Paginat(@Query() paginationDto: PaginationDTO) {
      console.log(paginationDto);
      return this.clientesService.Paginat(paginationDto);
  }
}
