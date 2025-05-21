import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginHist } from './LoginHist.entity';
import { LoginHistService } from './LoginHist.service';
import { LoginHistController } from './LoginHist.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LoginHist])],
  providers: [LoginHistService],
  controllers: [LoginHistController],
  exports: [LoginHistService],
})
export class LoginHistModule {}
