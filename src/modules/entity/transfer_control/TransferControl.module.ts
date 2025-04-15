import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferControl } from './TransferControl.entity';
import { TransferControlService } from './TransferControl.service';
import { TransferControlController } from './TransferControl.controller';
import { CacheModule } from 'src/common/utils/cache/cache.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransferControl]), CacheModule],
  providers: [TransferControlService],
  controllers: [TransferControlController],
  exports: [TransferControlService], // ✅ 다른 모듈에서 사용 가능하도록 export
})
export class TransferControlModule {}
