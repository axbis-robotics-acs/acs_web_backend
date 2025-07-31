import { Controller, Get, Param, Req } from '@nestjs/common';
import { NodeService } from './Node.service';
import { Node } from './Node.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('node')
@Controller('node')
export class NodeController {
  constructor(private readonly nodeService: NodeService) { }

  @Get()
  async findAll(@Req() req: any): Promise<Node[]> {
    const site_cd = req.session.user.site_cd;
    return this.nodeService.findAll(site_cd);
  }

}
