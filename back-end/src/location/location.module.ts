import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [LocationService],
  controllers: [LocationController],
  imports: [PrismaModule],
})
export class LocationModule {}
