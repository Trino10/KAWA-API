import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user/entities/user.repository';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  
  constructor(
    private readonly usuarioRepository: UserRepository,
    // private readonly rolRepository: RolRepository,
    private readonly jwtService: JwtService
    ){}

  async login(loginDto: LoginAuthDto){
    const usuario = await this.usuarioRepository.findByEmail(loginDto.email);
    if (!usuario){
      throw new NotFoundException('Usuario no existe')
    }
    let isValidPassword;
    try {
      isValidPassword = await this.isMatch(loginDto.password, usuario.password)
    }catch(error){
      throw new InternalServerErrorException('Error validar password')
    }
    
    if (isValidPassword){
      // return 'Login success'
      // return this.getAccessToken(usuario);
      return{
        msg: 'Usuario validado',
        status: 200,
        user: usuario,
        token: this.getAccessToken(usuario)
      }
    }else{
      return 'Login not success'
    }
  }

  async register(registerDto: RegisterAuthDto) {
    console.log(registerDto)

    if (await this.usuarioRepository.findByEmail(registerDto.email)){
      throw new BadRequestException('El email no existe en la Base de Datos')
    }

    if (await this.usuarioRepository.findByUsername(registerDto.username)){
      throw new BadRequestException('El username no existe en la Base de Datos')
    }

    console.log('el email', registerDto.email, ' no existe en la BD')
    try{
      registerDto.password = await this.getHash(registerDto.password);
      return this.usuarioRepository.save(registerDto);
    }catch(error){
      throw new InternalServerErrorException('Error al crear el registro')
    }

  }

  //funcion para encriptar la contraseña
  async getHash (password: string){
    return await bcrypt.hash(password, 10);
  }
 
  //funcion para comparar la contraseña en texto plano y la contraseña encriptada
  async isMatch (password: string, hash: string){
    return await bcrypt.compare(password, hash)
  }
  
  private getAccessToken(user: User) {
    try {
      const accessToken = this.jwtService.sign({
        id: user.id,
        name: user.username,
        email: user.email,
      });
      return {
        token: accessToken
      };
    } catch (error) {
      console.error('Error al crear el token:', error);
      throw new InternalServerErrorException('Error al crear el token');
    }
  }
  
}