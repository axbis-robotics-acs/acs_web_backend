import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Const } from './Const.entity';
import { ConstService } from './Const.service';
import { ConstController } from './Const.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Const])],
  providers: [ConstService],
  controllers: [ConstController],
  exports: [ConstService],
})
export class ConstModule {}
