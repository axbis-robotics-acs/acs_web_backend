import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './Link.entity';
import { LinkService } from './Link.service';
import { LinkController } from './Link.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  providers: [LinkService],
  controllers: [LinkController],
})
export class LinkModule {}
