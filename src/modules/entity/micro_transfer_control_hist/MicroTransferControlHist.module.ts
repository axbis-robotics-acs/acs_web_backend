import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from 'src/common/cache/cache.module';
import { MicroTransferControlHist } from './MicroTransferControlHist.entity';
import { MicroTransferControlHistService } from './MicroTransferControlHist.service';
import { MicroTransferControlHistHistController } from './MicroTransferControlHist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MicroTransferControlHist]), CacheModule],
  providers: [MicroTransferControlHistService],
  controllers: [MicroTransferControlHistHistController],
  exports: [MicroTransferControlHistService], // ✅ 다른 모듈에서 사용 가능하도록 export
})
export class MicroTransferControlHistModule {}
