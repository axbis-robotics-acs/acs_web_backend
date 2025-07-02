// src/common/handler/handler.module.ts
import { Module } from '@nestjs/common';
import { ResponseManager } from './response.manager';

@Module({
  providers: [ResponseManager],
  exports: [ResponseManager],
})
export class HandlerModule {}
