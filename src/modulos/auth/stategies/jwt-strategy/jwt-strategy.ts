import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/modulos/user/entities/user.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/modulos/user/entities/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userRepository: UserRepository,
        private readonly configService: ConfigService
        ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET')

        })
    }
    async validate(payload: User){
        console.log(payload)
        return{
            id: payload.id,
            name: payload.username,
            email: payload.email,
        }
    }
}
