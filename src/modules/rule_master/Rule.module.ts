import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from './Rule.entity';
import { RuleService } from './Rule.service';
import { RuleController } from './Rule.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rule])],
  providers: [RuleService],
  controllers: [RuleController],
})
export class RuleModule {}
