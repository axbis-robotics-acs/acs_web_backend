import { Module } from '@nestjs/common';
import { MapParserService } from './map.parser.service';
import { MapParserController } from './map.parser.controller';
import { NodeModule } from '../entity/node_master/Node.module';
import { MapModule } from '../entity/map_master/Map.module';

@Module({
  imports: [NodeModule, MapModule],
  providers: [MapParserService],
  controllers: [MapParserController],
})
export class MapParserModule {}
