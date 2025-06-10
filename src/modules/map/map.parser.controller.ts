// src/map-parser/map-parser.controller.ts
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MapParserService } from './map.parser.service';
import { Node } from '../entity/node_master/Node.entity';
import { NodeService } from '../entity/node_master/Node.service';
import { MapService } from '../entity/map_master/Map.service';
import { CommonCriteriaHistInput } from 'src/common/query/common.criteria';

@Controller('map')
export class MapParserController {
  constructor(
    private readonly mapParserService: MapParserService,
    private readonly nodeService: NodeService,
    private readonly mapService: MapService,
  ) {}

  @Post('import-map')
  @UseInterceptors(FileInterceptor('file'))
  async importMapFile(
    @UploadedFile() file: any,
    @Body('sitecd') sitecd: string,
  ): Promise<{ count: number }> {
    console.log('Received file:', file);

    const mapUuid = Date.now(); // 예: 1717921823794 → bigint 가능 (millisecond timestamp)
    const filename = file.originalname.split('.')[0];
    const fileContent = file.buffer.toString('utf-8');

    const criteria = CommonCriteriaHistInput.build(
      sitecd,
      'loaded map',
      'loadmap',
      'administrator',
    );

    //맵 버전 확인
    const latestVersion = await this.mapService.findLatestVersion(
      sitecd,
      filename,
    );
    let newVersion = '1.0';
    if (latestVersion) {
      const majorVersion = parseInt(latestVersion.split('.')[0], 10);
      newVersion = `${majorVersion + 1}.0`;
    }

    this.mapService.create({
      map_uuid: mapUuid,
      map_nm: filename,
      map_val: fileContent,
      map_res: 1,
      map_ver: newVersion,
      ...criteria,
    });

    const nodeEntities: Node[] = this.mapParserService.parseNodeEntities(
      fileContent,
      mapUuid,
      criteria,
    );

    console.log('Parsed node entities:', nodeEntities);

    // 기존 데이터 삭제 후 재삽입 가능 (옵션)
    await this.nodeService.delete({ map_uuid: mapUuid, site_cd: sitecd });

    console.log(
      'Deleted existing nodes for map:',
      filename,
      'and site:',
      sitecd,
    );

    // 저장
    await this.nodeService.createAll(nodeEntities);

    console.log('Inserted new nodes:', nodeEntities.length);

    return { count: nodeEntities.length };
  }
}
