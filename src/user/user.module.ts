import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './shared/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './shared/user/user';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {} // Esta é a única declaração que deve existir aqui
