import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: {
      [key: string]: any;
    }; // 또는 정확한 타입 지정: `UserInfoType`
  }
}
