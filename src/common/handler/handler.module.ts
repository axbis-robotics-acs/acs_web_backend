// src/common/handler/handler.module.ts
import { Module } from '@nestjs/common';
import { ResponseManager } from './response.manager';

@Module({
  providers: [ResponseManager],
  exports: [ResponseManager], // ✅ 반드시 export 해야 함
})
export class HandlerModule {}
