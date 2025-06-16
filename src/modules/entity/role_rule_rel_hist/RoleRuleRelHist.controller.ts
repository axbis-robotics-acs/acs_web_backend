import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleRuleRelHistService } from './RoleRuleRelHist.service';
import { RoleRuleRelHist } from './RoleRuleRelHist.entity';

@ApiTags('rolerulerelHist')
@Controller('rolerulerelHist')
export class RoleRuleRelHistController {
  constructor(
    private readonly rolerulerelHistService: RoleRuleRelHistService,
  ) {}

  @Get()
  async findAll(): Promise<RoleRuleRelHist[]> {
    return this.rolerulerelHistService.findAll();
  }
}
