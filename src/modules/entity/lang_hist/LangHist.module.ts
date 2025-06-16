import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LangHist } from './LangHist.entity';
import { LangHistService } from './LangHist.service';
import { LangHistController } from './LangHist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LangHist])],
  providers: [LangHistService],
  controllers: [LangHistController],
})
export class LangHistModule {}
