import { Injectable } from '@nestjs/common';
import { CreateEditorialeDto } from './dto/create-editoriale.dto';
import { UpdateEditorialeDto } from './dto/update-editoriale.dto';

@Injectable()
export class EditorialesService {
  create(createEditorialeDto: CreateEditorialeDto) {
    return 'This action adds a new editoriale';
  }

  findAll() {
    return `This action returns all editoriales`;
  }

  findOne(id: number) {
    return `This action returns a #${id} editoriale`;
  }

  update(id: number, updateEditorialeDto: UpdateEditorialeDto) {
    return `This action updates a #${id} editoriale`;
  }

  remove(id: number) {
    return `This action removes a #${id} editoriale`;
  }
}
