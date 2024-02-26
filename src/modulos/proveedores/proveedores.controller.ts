import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ProveedoresService } from './proveedores.service';
import { CreateProveedoreDto } from './dto/create-proveedore.dto';
import { UpdateProveedoreDto } from './dto/update-proveedore.dto';
import { PaginationDTO } from './dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('proveedores')
export class ProveedoresController {
  constructor(private readonly proveedoresService: ProveedoresService) { }

  // INSERTAR
  // @Post()
  // create(@Body() createProveedoreDto: CreateProveedoreDto) {
  //   console.log('proveedor creado')
  //   return this.proveedoresService.create(createProveedoreDto);
  // }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createProveedoreDto: CreateProveedoreDto){
    return this.proveedoresService.create(createProveedoreDto)
  }

  // LISTAR TODOS
  @Get('listar')
  findAll() {
    return this.proveedoresService.findAll();
  }

  // LISTAR UNO
  @Get(':cif')
  ListarUno(@Param('cif') cif: string) {
    return this.proveedoresService.ListarUno(cif);
  }

  // MODIFICAR
  @Patch(':cif')
  update(@Param('cif') cif: string, @Body() updateProveedorDto: UpdateProveedoreDto) {
    return this.proveedoresService.UpdateProveedor(cif, updateProveedorDto);
  }

  // BORRAR
  @Delete(':cif')
  remove(@Param('cif') cif: string) {
    return this.proveedoresService.remove(cif);
  }

  // PAGINACIÓN
  @Get()									
  Paginat(@Query() paginationDto: PaginationDTO) {
      console.log(paginationDto);
      return this.proveedoresService.Paginat(paginationDto);
  }
}
