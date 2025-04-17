import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TransferControlHistService } from './TransferControlHist.service';
import { TransferControlHist } from './TransferControlHist.entity';
import { ApiTags } from '@nestjs/swagger';
import { BaseException } from 'src/common/utils/exceptions/base.exception';

@ApiTags('transfercontrolhist')
@Controller('transfercontrolhist')
export class TransferControlHistController {
  constructor(
    private readonly transfercontrolhistService: TransferControlHistService,
  ) {}

  @Get()
  async findAll(): Promise<TransferControlHist[]> {
    return this.transfercontrolhistService.findAll();
  }

  @Post('search')
  async searchTasks(
    @Body() transferDto: { transfer_st: string; site_cd: string },
  ): Promise<any[]> {
    try {
      return this.transfercontrolhistService.searchTasks(
        transferDto.transfer_st,
        transferDto.site_cd,
      );
    } catch (error) {
      throw new BaseException({
        message: 'Error occurred while searching tasks',
        statusCode: 500,
        debugMessage: error.message,
      });
    }
  }
}
