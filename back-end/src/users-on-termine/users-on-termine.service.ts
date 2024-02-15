import { Injectable } from '@nestjs/common';
import { CreateUsersOnTermineDto } from './dto/create-users-on-termine.dto';
import { UpdateUsersOnTermineDto } from './dto/update-users-on-termine.dto';

@Injectable()
export class UsersOnTermineService {
  create(createUsersOnTermineDto: CreateUsersOnTermineDto) {
    return 'This action adds a new usersOnTermine';
  }

  findAll() {
    return `This action returns all usersOnTermine`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usersOnTermine`;
  }

  update(id: number, updateUsersOnTermineDto: UpdateUsersOnTermineDto) {
    return `This action updates a #${id} usersOnTermine`;
  }

  remove(id: number) {
    return `This action removes a #${id} usersOnTermine`;
  }
}
