import { Controller, Get, Param } from '@nestjs/common';
import { TransferControlHistService } from './TransferControlHist.service';
import { TransferControlHist } from './TransferControlHist.entity';

@Controller('transfercontrolhist')
export class TransferControlHistController {
  constructor(private readonly transfercontrolhistService: TransferControlHistService) {}

  @Get()
  async findAll(): Promise<TransferControlHist[]> {
    return this.transfercontrolhistService.findAll();
  }

}
