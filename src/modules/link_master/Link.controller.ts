import { Controller, Get, Param } from '@nestjs/common';
import { LinkService } from './Link.service';
import { Link } from './Link.entity';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Get()
  async findAll(): Promise<Link[]> {
    return this.linkService.findAll();
  }

}
