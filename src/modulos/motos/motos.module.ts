import { Module } from '@nestjs/common';
import { MotosService } from './motos.service';
import { MotosController } from './motos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moto } from './entities/moto.entity';
import { ClientesModule } from '../clientes/clientes.module';
import { CategoriasModule } from '../categorias/categorias.module';

@Module({
  controllers: [MotosController],
  providers: [MotosService],
  imports: [
    ClientesModule,
    CategoriasModule,
    TypeOrmModule.forFeature([Moto])
  ],
  exports: [MotosService, TypeOrmModule]
})
export class MotosModule {}
