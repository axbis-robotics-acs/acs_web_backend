import { Controller, Get, Param } from '@nestjs/common';
import { RoleRuleRelService } from './RoleRuleRel.service';
import { RoleRuleRel } from './RoleRuleRel.entity';

@Controller('rolerulerel')
export class RoleRuleRelController {
  constructor(private readonly rolerulerelService: RoleRuleRelService) {}

  @Get()
  async findAll(): Promise<RoleRuleRel[]> {
    return this.rolerulerelService.findAll();
  }

}
