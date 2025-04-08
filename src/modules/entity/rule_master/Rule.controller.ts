import { Controller, Get, Param } from '@nestjs/common';
import { RuleService } from './Rule.service';
import { Rule } from './Rule.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('rule')
@Controller('rule')
export class RuleController {
  constructor(private readonly ruleService: RuleService) {}

  @Get()
  async findAll(): Promise<Rule[]> {
    return this.ruleService.findAll();
  }

}
