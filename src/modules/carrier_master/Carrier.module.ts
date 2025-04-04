import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrier } from './Carrier.entity';
import { CarrierService } from './Carrier.service';
import { CarrierController } from './Carrier.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Carrier])],
  providers: [CarrierService],
  controllers: [CarrierController],
})
export class CarrierModule {}
