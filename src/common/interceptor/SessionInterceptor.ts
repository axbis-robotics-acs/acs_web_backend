// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { BaseException } from '../exceptions/base.exception';
// import { RedisService } from '../adapter/redis/redis.service';
// import { Observable, from } from 'rxjs';

// @Injectable()
// export class SessionIdInterceptor implements NestInterceptor {

//   constructor(private readonly redisService: RedisService) { console.log('🟢 SessionIdInterceptor 생성됨'); }

//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     console.log('🟡 Interceptor 호출됨');

//     return from(this.handle(context, next));
//   }

//   private async handle(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
//     const req = context.switchToHttp().getRequest();
//     const res = context.switchToHttp().getResponse();
//     console.log(`🔍 [req.start] ${req.method} ${req.url}`);

//     res.on('finish', () => {
//       console.log(`✅ [res.finish] ${req.method} ${req.url}`);
//     });

//     res.on('close', () => {
//       console.warn(`⚠️ [res.close] ${req.method} ${req.url} → 클라이언트가 연결 끊음`);
//     });

//     const skipPaths = ['login', 'site', 'language'];
//     if (skipPaths.some(path => req.path.includes(path))) {
//       return next.handle();
//     }

//     const sessionId = req.headers['session_id'] as string;
//     if (!sessionId) {
//       throw new BaseException({ message: '세션 ID 없음', statusCode: 401 });
//     }

//     const user = await this.redisService.getSessionUser(sessionId.trim());
//     if (!user) {
//       throw new BaseException({ message: '세션 만료 또는 유효하지 않음', statusCode: 401 });
//     }

//     req.user = user;
//     return next.handle();
//   }
// }


import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { BaseException } from '../exceptions/base.exception';
import { RedisService } from '../adapter/redis/redis.service';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class SessionIdInterceptor implements NestInterceptor {
  constructor(private readonly redisService: RedisService) {
    console.log('🟢 SessionIdInterceptor 생성됨');
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('🟡 Interceptor 호출됨');

    return from(this.validateSession(context)).pipe(
      switchMap(() => next.handle()),
    );
  }

  private async validateSession(context: ExecutionContext): Promise<void> {
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    console.log(`🔍 [req.start] ${req.method} ${req.url}`);

    res.on('finish', () => {
      console.log(`✅ [res.finish] ${req.method} ${req.url}`);
    });

    res.on('close', () => {
      console.warn(`⚠️ [res.close] ${req.method} ${req.url} → 클라이언트가 연결 끊음`);
    });

    const skipPaths = ['login', 'site', 'language'];
    if (skipPaths.some(path => req.path.includes(path))) {
      return;
    }

    const sessionId = req.headers['session_id'] as string;
    if (!sessionId) {
      throw new BaseException({ message: '세션 ID 없음', statusCode: 401 });
    }

    const user = await this.redisService.getSessionUser(sessionId.trim());
    if (!user) {
      throw new BaseException({ message: '세션 만료 또는 유효하지 않음', statusCode: 401 });
    }

    req.user = user;
  }
}
