import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaHist } from './AreaHist.entity';
import { AreaHistService } from './AreaHist.service';
import { AreaHistController } from './AreaHist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AreaHist])],
  providers: [AreaHistService],
  controllers: [AreaHistController],
})
export class AreaHistModule {}
