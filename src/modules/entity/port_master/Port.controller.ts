import { Controller, Get, Param, Query } from '@nestjs/common';
import { PortService } from './Port.service';
import { Port } from './Port.entity';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('port')
@Controller('port')
export class PortController {
  constructor(private readonly portService: PortService) {}

  @Get()
  async findAll(): Promise<Port[]> {
    return this.portService.findAll();
  }

  @Get('source')
  @ApiOperation({
    summary: 'Source Port 목록 조회',
    description: 'site_cd를 기준으로 LOAD, BOTH 타입의 포트 목록을 조회합니다.',
  })
  async getSourcePorts(@Query('site_cd') site_cd: string): Promise<Port[]> {
    console.log(site_cd);
    return this.portService.getSourcePorts(site_cd);
  }

  @Get('destination')
  @ApiOperation({
    summary: 'Destination Port 목록 조회',
    description:
      'site_cd를 기준으로 UNLOAD, BOTH 타입의 포트 목록을 조회합니다.',
  })
  async getDestinationPorts(
    @Query('site_cd') site_cd: string,
  ): Promise<Port[]> {
    console.log(site_cd);
    return this.portService.getDestinationPorts(site_cd);
  }
}
