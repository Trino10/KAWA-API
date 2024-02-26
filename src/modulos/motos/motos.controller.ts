import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { MotosService } from './motos.service';
import { CreateMotoDto } from './dto/create-moto.dto';
import { UpdateMotoDto } from './dto/update-moto.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('motos')
export class MotosController {
  constructor(private readonly motosService: MotosService) {}

  // INSERTAR
  // @Post()
  // create(@Body() createMotoDto: CreateMotoDto) {
  //   console.log('moto creada')
  //   return this.motosService.create(createMotoDto);
  // }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createMotoDto: CreateMotoDto){
    return this.motosService.create(createMotoDto)
  }



  // LISTAR TODOS
  @Get('listar')
  findAll() {
    return this.motosService.findAll();
  }

  // LISTAR UNO
  @Get(':matricula')
  ListarUno(@Param('matricula') matricula: string) {
    return this.motosService.ListarUno(matricula);
  }

  // MODIFICAR
  @Patch(':matricula')
  update(@Param('matricula') matricula: string, @Body() updateProveedorDto: UpdateMotoDto) {
    return this.motosService.UpdateProveedor(matricula, updateProveedorDto);
  }

  // BORRAR
  @Delete(':matricula')
  remove(@Param('matricula') matricula: string) {
    return this.motosService.remove(matricula);
  }
}
