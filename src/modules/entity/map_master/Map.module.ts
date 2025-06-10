import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Map } from './Map.entity';
import { MapService } from './Map.service';
import { MapController } from './Map.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Map])],
  providers: [MapService],
  controllers: [MapController],
  exports: [MapService],
})
export class MapModule {}
