import { CreateLocationDto } from './dto/create-location.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocationService {
  constructor(private prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.location.findMany();
  }

  findOne(id: number) {
    return this.prismaService.location.findUnique({ where: { id } });
  }

  create(createLocationDto: CreateLocationDto) {
    return this.prismaService.location.create({ data: createLocationDto });
  }
}
