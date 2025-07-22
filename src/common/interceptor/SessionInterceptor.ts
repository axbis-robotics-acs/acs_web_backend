import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { BaseException } from '../exceptions/base.exception';

@Injectable()
export class SessionIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    // 예외 처리 제외 경로
    const skipPaths = ['login', 'site', 'language'];
    if (skipPaths.some(path => req.path.includes(path))) {
      return next.handle();
    }

    // 세션 ID 및 store
    const sessionId = req.headers['session_id'] as string;

    // 응답 상태 로깅
    res.on('finish', () => {
      console.log(`✅ [res.finish] ${req.method} ${req.url}`);
    });

    res.on('close', () => {
      console.warn(`⚠️ [res.close] ${req.method} ${req.url} → 클라이언트가 연결 끊음`);
    });

    // 세션 ID가 없을 경우
    if (!sessionId || !req.session) {
      return throwError(() =>
        new BaseException({
          message: '세션이 존재하지 않거나 만료되었습니다.',
          statusCode: 401,
          errorCode: 'SESSION_NOT_FOUND',
        }),
      );
    }

    return next.handle();
  }
}