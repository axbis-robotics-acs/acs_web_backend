import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userclass } from './Userclass.entity';
import { UserclassService } from './Userclass.service';
import { UserclassController } from './Userclass.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Userclass])],
  providers: [UserclassService],
  controllers: [UserclassController],
})
export class UserclassModule {}
