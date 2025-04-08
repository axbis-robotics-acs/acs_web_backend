// src/common/utils/error-wrapper.util.ts
import { BaseException } from './base.exception';
import { HttpException } from '@nestjs/common';

export function globalException(error: unknown): BaseException {
  if (error instanceof BaseException) {
    return error; // 이미 BaseException이면 그대로 반환
  }

  if (error instanceof HttpException) {
    const res = error.getResponse() as any;
    const message = typeof res === 'string' ? res : res.message || 'Unexpected HTTP error';
    return new BaseException({
      message,
      statusCode: error.getStatus(),
      errorCode: res?.errorCode,
      debugMessage: res?.debugMessage || error.stack,
    });
  }

  if (error instanceof Error) {
    return new BaseException({
      message: 'Internal server error',
      statusCode: 500,
      debugMessage: error.message,
    });
  }

  // 완전히 예상 못한 에러 타입
  return new BaseException({
    message: 'Unknown error',
    statusCode: 500,
    debugMessage: JSON.stringify(error),
  });
}
