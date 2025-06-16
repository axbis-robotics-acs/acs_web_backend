import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteHist } from './SiteHist.entity';
import { SiteHistService } from './SiteHist.service';
import { SiteHistController } from './SiteHist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SiteHist])],
  providers: [SiteHistService],
  controllers: [SiteHistController],
})
export class SiteHistModule {}
