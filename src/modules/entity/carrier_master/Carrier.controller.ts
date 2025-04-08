import { Controller, Get, Param } from '@nestjs/common';
import { CarrierService } from './Carrier.service';
import { Carrier } from './Carrier.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('carrier')
@Controller('carrier')
export class CarrierController {
  constructor(private readonly carrierService: CarrierService) {}

  @Get()
  async findAll(): Promise<Carrier[]> {
    return this.carrierService.findAll();
  }

}
