import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TerminService } from './termin.service';
import { CreateTerminDto } from './dto/create-termin.dto';
import { UpdateTerminDto } from './dto/update-termin.dto';

@Controller('termin')
export class TerminController {
  constructor(private readonly terminService: TerminService) {}

  @Post()
  create(@Body() createTerminDto: CreateTerminDto) {
    return this.terminService.create(createTerminDto);
  }

  @Get()
  findAllInOneLocation(@Param('id') idLocation: string) {
    return this.terminService.findAllInOneLocation(+idLocation);
  }
  /*
  @Get(':user_id')
  findAllTermineOfAUser(@Param('user_id') id: string) {
    return this.terminService.findAllTermineOfAUser(id);
  }*/

  @Get(':location_id/:user_id')
  findUserTermineInALocation(@Param() params: string[]) {
    return this.terminService.findUserTermineInALocation(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.terminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTerminDto: UpdateTerminDto) {
    return this.terminService.update(+id, updateTerminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.terminService.remove(+id);
  }
}
