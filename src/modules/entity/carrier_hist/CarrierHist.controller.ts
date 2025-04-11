import { Controller, Get, Param, Post } from '@nestjs/common';
import { CarrierHistService } from './CarrierHist.service';
import { CarrierHist } from './CarrierHist.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('carrierhist')
@Controller('carrierhist')
export class CarrierHistController {
  constructor(private readonly carrierhistService: CarrierHistService) {}

  @Get()
  async findAll(): Promise<CarrierHist[]> {
    return this.carrierhistService.findAll();
  }
}
