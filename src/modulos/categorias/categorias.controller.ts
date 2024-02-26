import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { PaginationDTO } from '../clientes/dto/pagination.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  // INSERTAR
  // @Post()
  // create(@Body() createCategoriaDto: CreateCategoriaDto) {
  //   console.log('categoria creada')
  //   return this.categoriasService.create(createCategoriaDto);
  // }


  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createCategoriaDto: CreateCategoriaDto){
    return this.categoriasService.create(createCategoriaDto)
  }

  // LISTAR TODOS
  @Get('listar')
  findAll() {
    return this.categoriasService.findAll();
  }

  // LISTAR UNO
  @Get(':catid')
  ListarUno(@Param('catid') catid: string) {
    return this.categoriasService.ListarUno(catid);
  }

    // MODIFICAR
    @Patch(':catid')
    update(@Param('catid') catid: string, @Body() updateProveedorDto: UpdateCategoriaDto) {
      return this.categoriasService.UpdateCategoria(catid, updateProveedorDto);
    }
  
    // BORRAR
    @Delete(':catid')
    remove(@Param('catid') catid: string) {
      return this.categoriasService.remove(catid);
    }
  
    // PAGINACIÓN
    @Get()									
    Paginat(@Query() paginationDto: PaginationDTO) {
        console.log(paginationDto);
        return this.categoriasService.Paginat(paginationDto);
    }

}
