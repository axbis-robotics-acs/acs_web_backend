import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRuleRelHist } from './RoleRuleRelHist.entity';
import { RoleRuleRelHistService } from './RoleRuleRelHist.service';
import { RoleRuleRelHistController } from './RoleRuleRelHist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRuleRelHist])],
  providers: [RoleRuleRelHistService],
  controllers: [RoleRuleRelHistController],
})
export class RoleRuleRelHistModule {}
