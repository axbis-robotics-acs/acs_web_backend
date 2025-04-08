import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortHist } from './PortHist.entity';
import { PortHistService } from './PortHist.service';
import { PortHistController } from './PortHist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PortHist])],
  providers: [PortHistService],
  controllers: [PortHistController],
})
export class PortHistModule {}
