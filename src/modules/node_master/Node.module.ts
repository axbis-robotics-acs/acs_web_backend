import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Node } from './Node.entity';
import { NodeService } from './Node.service';
import { NodeController } from './Node.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Node])],
  providers: [NodeService],
  controllers: [NodeController],
})
export class NodeModule {}
