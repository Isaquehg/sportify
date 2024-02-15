import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersOnTermineService } from './users-on-termine.service';
import { CreateUsersOnTermineDto } from './dto/create-users-on-termine.dto';
import { UpdateUsersOnTermineDto } from './dto/update-users-on-termine.dto';

@Controller('users-on-termine')
export class UsersOnTermineController {
  constructor(private readonly usersOnTermineService: UsersOnTermineService) {}

  @Post()
  create(@Body() createUsersOnTermineDto: CreateUsersOnTermineDto) {
    return this.usersOnTermineService.create(createUsersOnTermineDto);
  }

  @Get()
  findAll() {
    return this.usersOnTermineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersOnTermineService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsersOnTermineDto: UpdateUsersOnTermineDto) {
    return this.usersOnTermineService.update(+id, updateUsersOnTermineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersOnTermineService.remove(+id);
  }
}
