import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User>{
    constructor (private datasource:DataSource){
        super(User, datasource.createEntityManager())
    }

    async findByEmail(email:string){
        try{
            return await this.createQueryBuilder('USERS')
            .where(`email= :value`, {value:email})
            .getOne()
        }catch(error){
            throw new InternalServerErrorException('Error!!! (estoy en user.repository.ts)');
        }
    }

    async findByUsername(username:string){
        try{
            return await this.createQueryBuilder('USERS')
            .where(`username= :value`, {value:username})
            .getOne()
        }catch(error){
            throw new InternalServerErrorException('Error!!! (estoy en user.repository.ts)');
        }
    }
}