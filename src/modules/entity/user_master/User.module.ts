import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.entity';
import { UserService } from './User.service';
import { UserController } from './User.controller';
import { LoginHistModule } from '../login_hist/LoginHist.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoginHistModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
