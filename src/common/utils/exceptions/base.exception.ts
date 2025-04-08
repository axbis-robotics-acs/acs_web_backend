// src/common/exceptions/base.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

interface BaseExceptionOptions {
  message: string;               // 프론트에 보여줄 메시지
  statusCode?: number;           // HTTP 상태 코드 (기본: 400)
  errorCode?: string;            // 사용자 정의 에러코드 (ex. USER_NOT_FOUND)
  debugMessage?: string;         // 내부 디버깅용 메시지
  extra?: Record<string, any>;   // 추가 전달할 데이터 (선택)
}

export class BaseException extends HttpException {
  constructor(options: BaseExceptionOptions) {
    const {
      message,
      statusCode = HttpStatus.BAD_REQUEST,
      errorCode,
      debugMessage,
      extra,
    } = options;

    super(
      {
        success: false,
        message,
        errorCode,
        debugMessage,
        ...(extra || {}),
      },
      statusCode,
    );
  }
}
