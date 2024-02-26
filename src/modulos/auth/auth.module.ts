import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/entities/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './stategies/jwt-strategy/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {
    //     expiresIn: '1h',
    //     algorithm: 'HS256',
    //   },
    // }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => {
        return{
          secret: configService.get('JWT_SECRET'),
          signOptions: {
          expiresIn: '1h',
          algorithm: 'HS256', 
          }
        }
      }

    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy, ConfigService],
})
export class AuthModule {}
