import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { BaseException } from '../exceptions/base.exception';

@Injectable()
export class SessionIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    if (req.path.includes('login')) {
      return next.handle();
    }

    // ✅ 1. Header에서 session_id 추출
    const sessionId = req.headers['session_id'];

    console.log(`Session ID: ${sessionId}`);

    if (!sessionId) {
      throw new BaseException({
        message: '세션이 존재하지 않습니다.',
        statusCode: 401,
        errorCode: 'SESSION_NOT_FOUND',
        debugMessage: 'Header에 session_id가 없음',
      });
    }

    // ✅ 2. 세션 ID를 express-session과 연동
    const store = req.sessionStore;

    return new Promise((resolve, reject) => {
      store.get(sessionId, (err, sessionData) => {
        if (err) {
          return reject(
            new BaseException({
              message: '세션 조회 중 오류가 발생했습니다.',
              statusCode: 401,
              errorCode: 'SESSION_LOOKUP_ERROR',
              debugMessage: err.message,
            }),
          );
        }
        if (!sessionData || !sessionData.user) {
          return reject(
            new BaseException({
              message: '세션이 만료되었거나 유효하지 않습니다.',
              statusCode: 401,
              errorCode: 'SESSION_INVALID',
              debugMessage: JSON.stringify(sessionData),
            }),
          );
        }

        // ✅ 3. 세션에서 사용자 정보 꺼내서 req에 할당
        req.session = sessionData;
        req.sessionID = sessionId;

        resolve(next.handle());
      });
    }) as unknown as Observable<any>;
  }
}
