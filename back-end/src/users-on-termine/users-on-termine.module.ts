import { Module } from '@nestjs/common';
import { UsersOnTermineService } from './users-on-termine.service';
import { UsersOnTermineController } from './users-on-termine.controller';

@Module({
  controllers: [UsersOnTermineController],
  providers: [UsersOnTermineService],
})
export class UsersOnTermineModule {}
