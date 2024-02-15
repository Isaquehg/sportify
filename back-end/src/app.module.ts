import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { LocationModule } from './location/location.module';
import { TerminModule } from './termin/termin.module';
import { UsersOnTermineModule } from './users-on-termine/users-on-termine.module';
import { UsersOnTermineModule } from './users-on-termine/users-on-termine.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, LocationModule, TerminModule, UsersOnTermineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
