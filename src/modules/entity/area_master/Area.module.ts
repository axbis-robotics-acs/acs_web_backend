import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Area } from './Area.entity';
import { AreaService } from './Area.service';
import { AreaController } from './Area.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Area])],
  providers: [AreaService],
  controllers: [AreaController],
})
export class AreaModule {}
