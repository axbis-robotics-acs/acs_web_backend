import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConstHist } from './ConstHist.entity';
import { ConstHistService } from './ConstHist.service';
import { ConstHistController } from './ConstHist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ConstHist])],
  providers: [ConstHistService],
  controllers: [ConstHistController],
})
export class ConstHistModule {}
