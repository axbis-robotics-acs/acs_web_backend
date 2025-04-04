import { Controller, Get, Param } from '@nestjs/common';
import { CarrierService } from './Carrier.service';
import { Carrier } from './Carrier.entity';

@Controller('carrier')
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) {}

  @Get()
  async findAll(): Promise<Carrier[]> {
    return this.carrierService.findAll();
  }

}
