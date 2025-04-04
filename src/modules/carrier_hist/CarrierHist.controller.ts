import { Controller, Get, Param } from '@nestjs/common';
import { CarrierHistService } from './CarrierHist.service';
import { CarrierHist } from './CarrierHist.entity';

@Controller('carrierhist')
export class CarrierHistController {
  constructor(private readonly carrierhistService: CarrierHistService) {}

  @Get()
  async findAll(): Promise<CarrierHist[]> {
    return this.carrierhistService.findAll();
  }

}
