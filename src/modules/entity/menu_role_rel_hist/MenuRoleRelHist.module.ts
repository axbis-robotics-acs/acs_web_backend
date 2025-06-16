import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuRoleRelHist } from './MenuRoleRelHist.entity';
import { MenuRoleRelHistService } from './MenuRoleRelHist.service';
import { MenuRoleRelHistController } from './MenuRoleRelHist.controller';
@Module({
  imports: [TypeOrmModule.forFeature([MenuRoleRelHist])],
  providers: [MenuRoleRelHistService],
  controllers: [MenuRoleRelHistController],
})
export class MenuRoleRelModule {}
