import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { AutoresModule } from '../autores/autores.module';
import { CategoriasModule } from '../categorias/categorias.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ AutoresModule, CategoriasModule ]
})
export class SeedModule {}
