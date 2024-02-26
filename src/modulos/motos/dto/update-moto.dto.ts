import { PartialType } from '@nestjs/mapped-types';
import { CreateMotoDto } from './create-moto.dto';

export class UpdateMotoDto extends PartialType(CreateMotoDto) {}
