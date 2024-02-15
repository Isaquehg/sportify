import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { LocationEntity } from './entity/location.entity';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  @Get()
  findAll() {
    return this.locationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.locationService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: LocationEntity })
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }
}
