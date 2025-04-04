import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Port } from './Port.entity';
import { PortService } from './Port.service';
import { PortController } from './Port.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Port])],
  providers: [PortService],
  controllers: [PortController],
})
export class PortModule {}
