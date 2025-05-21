import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferControl } from './TransferControl.entity';
import { TransferControlService } from './TransferControl.service';
import { TransferControlController } from './TransferControl.controller';
import { CacheModule } from 'src/common/cache/cache.module';
import { MqttModule } from 'src/common/adapter/mqtt/mqtt.module';
import { HandlerModule } from 'src/common/handler/handler.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TransferControl]),
    CacheModule,
    MqttModule,
    HandlerModule,
  ],
  providers: [TransferControlService],
  controllers: [TransferControlController],
  exports: [TransferControlService], // ✅ 다른 모듈에서 사용 가능하도록 export
})
export class TransferControlModule {}
