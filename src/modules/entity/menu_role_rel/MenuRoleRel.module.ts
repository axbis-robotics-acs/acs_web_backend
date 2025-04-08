import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuRoleRel } from './MenuRoleRel.entity';
import { MenuRoleRelService } from './MenuRoleRel.service';
import { MenuRoleRelController } from './MenuRoleRel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MenuRoleRel])],
  providers: [MenuRoleRelService],
  controllers: [MenuRoleRelController],
})
export class MenuRoleRelModule {}
