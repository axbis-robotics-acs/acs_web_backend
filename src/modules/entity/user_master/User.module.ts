import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.entity';
import { UserService } from './User.service';
import { UserController } from './User.controller';
import { LoginHistModule } from '../login_hist/LoginHist.module';
import { ConstModule } from '../const_master/Const.module';
import { RedisModule } from 'src/common/adapter/redis/redis.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoginHistModule, ConstModule, RedisModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule { }
