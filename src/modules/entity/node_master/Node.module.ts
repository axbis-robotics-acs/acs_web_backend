import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './Node.entity';
import { NodeService } from './Node.service';
import { NodeController } from './Node.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Node])],
  providers: [NodeService],
  controllers: [NodeController],
  exports: [NodeService], // NodeService를 다른 모듈에서 사용할 수 있도록 export
})
export class NodeModule {}
