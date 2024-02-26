import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProveedoresModule } from '../proveedores/proveedores.module';
import { ClientesModule } from '../clientes/clientes.module';
import { MotosModule } from '../motos/motos.module';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { CategoriasModule } from '../categorias/categorias.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ProveedoresModule,MotosModule,ClientesModule,UsuariosModule,CategoriasModule]
})
export class SeedModule {}
