import { Controller, Get, Param } from '@nestjs/common';
import { RuleService } from './Rule.service';
import { Rule } from './Rule.entity';

@Controller('rule')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Get()
  async findAll(): Promise<Rule[]> {
    return this.ruleService.findAll();
  }

}
