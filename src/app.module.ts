import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AutoresModule } from './modulos/autores/autores.module';
import { SeedModule } from './modulos/seed/seed.module';
import { ClientesModule } from './modulos/clientes/clientes.module';
import { LibrosModule } from './modulos/libros/libros.module';
import { CategoriasModule } from './modulos/categorias/categorias.module';
import { TiendasModule } from './modulos/tiendas/tiendas.module';
import { EditorialesModule } from './modulos/editoriales/editoriales.module';
import { AuthModule } from './modulos/auth/auth.module';
import { UserModule } from './modulos/user/user.module';
import { MotosModule } from './modulos/motos/motos.module';
import { ProveedoresModule } from './modulos/proveedores/proveedores.module';
import { UsuariosModule } from './modulos/usuarios/usuarios.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
      logging: true
    }),
    AutoresModule,
    ClientesModule,
    SeedModule,
    LibrosModule,
    CategoriasModule,
    TiendasModule,
    EditorialesModule,
    AuthModule,
    UserModule,
    MotosModule,
    ProveedoresModule,
    UsuariosModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
