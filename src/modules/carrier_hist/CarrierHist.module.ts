import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrierHist } from './CarrierHist.entity';
import { CarrierHistService } from './CarrierHist.service';
import { CarrierHistController } from './CarrierHist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CarrierHist])],
  providers: [CarrierHistService],
  controllers: [CarrierHistController],
})
export class CarrierHistModule {}
