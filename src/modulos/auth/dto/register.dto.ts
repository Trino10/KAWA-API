import { IsOptional, IsString } from "class-validator";

export class RegisterAuthDto {

    @IsString()
    email: string;

    @IsString()
    username: string;

    @IsString()
    password: string;


}
