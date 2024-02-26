import { Injectable } from '@nestjs/common';
import { CreateSeedDto } from './dto/create-seed.dto';
import { UpdateSeedDto } from './dto/update-seed.dto';
import { ProveedoresService } from '../proveedores/proveedores.service';
import { Proveedore } from '../proveedores/entities/proveedore.entity';
import * as seedProveedore from './data/proveedores.json'
import * as seedCliente from './data/clientes.json'
import * as seedUsuario from './data/usuarios.json'
import * as seedCategoria from './data/categorias.json'
import * as seedMotos from './data/motos.json'
import { ClientesService } from '../clientes/clientes.service';
import { Cliente } from '../clientes/entities/cliente.entity';
import { UsuariosService } from '../usuarios/usuarios.service';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { CategoriasService } from '../categorias/categorias.service';
import { Categoria } from '../categorias/entities/categoria.entity';
import { MotosService } from '../motos/motos.service';
import { Moto } from '../motos/entities/moto.entity';
import { CreateMotoDto } from '../motos/dto/create-moto.dto';
import { CreateCategoriaDto } from '../categorias/dto/create-categoria.dto';
import { CreateUsuarioDto } from '../usuarios/dto/create-usuario.dto';
import { CreateClienteDto } from '../clientes/dto/create-cliente.dto';
import { CreateProveedoreDto } from '../proveedores/dto/create-proveedore.dto';

@Injectable()
export class SeedService {
  constructor(
    private readonly proveedoreService: ProveedoresService,
    private readonly clientesService: ClientesService,
    private readonly usuariosService: UsuariosService,
    private readonly categoriasService: CategoriasService,
    private readonly motosService: MotosService
    ) {}

public async loadData() {
  try {
    await Promise.all([
      this.proveedoreService.deleteAllProveedore(),
      this.clientesService.deleteAllClientes(),
      this.usuariosService.deleteAllUsuarios(),
      this.categoriasService.deleteAllCategorias(),
      this.motosService.deleteAllMotos(),
      await this.insertNewProveedores(),
      await this.insertNewClientes(),
      await this.insertNewUsuarios(),
      await this.insertNewCategorias(),
    ]);

    await this.insertNewMotos();

    return 'Seed ejecutado correctamente';
  } catch (error) {
    return 'Seed ejecutado mal pero mal';
  }
}

private async insertNewProveedores(){
  await this.proveedoreService.deleteAllProveedore();
  const insertPromisesProveedore = [];
  seedProveedore.forEach( (pro: CreateProveedoreDto) => {
    insertPromisesProveedore.push(this.proveedoreService.create(pro));
  })
  const results = await Promise.all(insertPromisesProveedore);
  return true;
}


private async insertNewClientes(){
  await this.clientesService.deleteAllClientes();
  const insertPromisesClientes = [];
  seedCliente.forEach( (cli: CreateClienteDto) => {
    insertPromisesClientes.push(this.clientesService.create(cli));
  })
  const results = await Promise.all(insertPromisesClientes);
  return true;
}


private async insertNewUsuarios(){
  await this.usuariosService.deleteAllUsuarios();
  const insertPromisesUsuarios = [];
  seedUsuario.forEach( (usu: CreateUsuarioDto) => {
    insertPromisesUsuarios.push(this.usuariosService.create(usu));
  })
  const results = await Promise.all(insertPromisesUsuarios);
  return true;
}

private async insertNewCategorias(){
  await this.categoriasService.deleteAllCategorias();
  const insertPromisesCategorias = [];
  seedCategoria.forEach( (cat: CreateCategoriaDto) => {
    insertPromisesCategorias.push(this.categoriasService.create(cat));
  })
  const results = await Promise.all(insertPromisesCategorias);
  return true;
}


private async insertNewMotos(){
  await this.motosService.deleteAllMotos();
  const insertPromisesMotos = [];
  seedMotos.forEach( (moto: CreateMotoDto) => {
    insertPromisesMotos.push(this.motosService.create(moto));
  })
  const results = await Promise.all(insertPromisesMotos);
  return true;
}
}

