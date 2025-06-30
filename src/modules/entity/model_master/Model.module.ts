import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './Model.entity';
import { ModelService } from './Model.service';
import { ModelController } from './Model.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Model])],
  providers: [ModelService],
  controllers: [ModelController],
})
export class ModelModule {}
