import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutoresService } from './autores.service';
import { CreateAutoreDto } from './dto/create-autore.dto';
import { UpdateAutoreDto } from './dto/update-autore.dto';

@Controller('autores')
export class AutoresController {
  
  constructor(private readonly autoresService: AutoresService) {}

  @Post()
  protected create(@Body() createAutoreDto: CreateAutoreDto) {
    console.log('usuario creado');
    return this.autoresService.create(createAutoreDto);
  }

  @Get()
  findAll() {
    return this.autoresService.findAll();
  }

  @Get(':nif')
  findOne(@Param('nif') nif: string) {
    return this.autoresService.findOne(nif);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutoreDto: UpdateAutoreDto) {
    return this.autoresService.update(+id, updateAutoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.autoresService.remove(+id);
  }
}
