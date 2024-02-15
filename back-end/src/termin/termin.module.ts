import { Module } from '@nestjs/common';
import { TerminService } from './termin.service';
import { TerminController } from './termin.controller';

@Module({
  controllers: [TerminController],
  providers: [TerminService],
})
export class TerminModule {}
