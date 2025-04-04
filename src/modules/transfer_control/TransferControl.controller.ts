import { Controller, Get, Param } from '@nestjs/common';
import { TransferControlService } from './TransferControl.service';
import { TransferControl } from './TransferControl.entity';

@Controller('transfercontrol')
export class TransferControlController {
  constructor(private readonly transfercontrolService: TransferControlService) {}

  @Get()
  async findAll(): Promise<TransferControl[]> {
    return this.transfercontrolService.findAll();
  }

}
