import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferControl } from './TransferControl.entity';
import { TransferControlService } from './TransferControl.service';
import { TransferControlController } from './TransferControl.controller';
import { CacheModule } from 'src/common/cache/cache.module';
import { WriterModule } from 'src/common/writer/writer.module';
import { ResponseModule } from 'src/common/handler/response.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransferControl]),
    CacheModule,
    ResponseModule,
    WriterModule,
  ],
  providers: [TransferControlService],
  controllers: [TransferControlController],
  exports: [TransferControlService], // ✅ 다른 모듈에서 사용 가능하도록 export
})
export class TransferControlModule {}
