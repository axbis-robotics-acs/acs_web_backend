import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleRuleRel } from './RoleRuleRel.entity';
import { RoleRuleRelService } from './RoleRuleRel.service';
import { RoleRuleRelController } from './RoleRuleRel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRuleRel])],
  providers: [RoleRuleRelService],
  controllers: [RoleRuleRelController],
})
export class RoleRuleRelModule {}
