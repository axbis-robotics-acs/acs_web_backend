import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lang } from './Lang.entity';
import { LangService } from './Lang.service';
import { LangController } from './Lang.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Lang])],
  providers: [LangService],
  controllers: [LangController],
})
export class LangModule {}
