import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from 'src/common/cache/cache.module';
import { MicroTransferControl } from './MicroTransferControl.entity';
import { MicroTransferControlService } from './MicroTransferControl.service';
import { MicroTransferControlController } from './MicroTransferControl.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MicroTransferControl]), CacheModule],
  providers: [MicroTransferControlService],
  controllers: [MicroTransferControlController],
  exports: [MicroTransferControlService], // ✅ 다른 모듈에서 사용 가능하도록 export
})
export class MicroTransferControlModule {}
