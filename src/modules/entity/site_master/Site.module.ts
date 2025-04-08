import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Site } from './Site.entity';
import { SiteService } from './Site.service';
import { SiteController } from './Site.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Site])],
  providers: [SiteService],
  controllers: [SiteController],
})
export class SiteModule {}
