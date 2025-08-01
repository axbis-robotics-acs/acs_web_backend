import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { PortService } from './Port.service';
import { Port } from './Port.entity';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('port')
@Controller('port')
export class PortController {
  constructor(private readonly portService: PortService) {}

  @Get()
  async findAll(@Req() req:any): Promise<Port[]> {
    const user = req.session.user;
    return this.portService.findAll(user.site_cd);
  }

  @Get('source')
  @ApiOperation({
    summary: 'Source Port 목록 조회',
    description: 'site_cd를 기준으로 LOAD, BOTH 타입의 포트 목록을 조회합니다.',
  })
  async getSourcePorts(@Req() req:any): Promise<Port[]> {
    const user = req.session.user;
    return this.portService.getSourcePorts(user.site_cd);
  }

  @Get('destination')
  @ApiOperation({
    summary: 'Destination Port 목록 조회',
    description:
      'site_cd를 기준으로 UNLOAD, BOTH 타입의 포트 목록을 조회합니다.',
  })
  async getDestinationPorts(
    @Req() req:any
  ): Promise<Port[]> {
    const user = req.session.user;
    return this.portService.getDestinationPorts(user.site_cd);
  }
}
