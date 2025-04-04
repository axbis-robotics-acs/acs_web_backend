import { Controller, Get, Param } from '@nestjs/common';
import { NodeService } from './Node.service';
import { Node } from './Node.entity';

@Controller('node')
export class NodeController {
  constructor(private readonly nodeService: NodeService) {}

  @Get()
  async findAll(): Promise<Node[]> {
    return this.nodeService.findAll();
  }

}
