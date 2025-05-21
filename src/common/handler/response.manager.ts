import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ResponseManager {
  private readonly logger = new Logger(ResponseManager.name);
  private readonly responseMap = new Map<string, (response: string) => void>();
  private readonly timeoutMap = new Map<string, NodeJS.Timeout>();

  /**
   * UI 요청이 들어왔을 때 호출됨
   * 응답이 들어올 때까지 대기 (최대 30초)
   */
  waitFor(transactionId: string, timeoutMillis = 30000): Promise<string> {
    return new Promise((resolve, reject) => {
      if (this.responseMap.has(transactionId)) {
        return reject(
          new Error(
            `Duplicate waitFor call for transactionId: ${transactionId}`,
          ),
        );
      }

      // 응답 등록
      this.responseMap.set(transactionId, resolve);

      // 타임아웃 설정
      const timeout = setTimeout(() => {
        this.logger.warn(`Timeout waiting for response: ${transactionId}`);
        this.responseMap.delete(transactionId);
        reject(new Error(`Timeout waiting for response: ${transactionId}`));
      }, timeoutMillis);

      this.timeoutMap.set(transactionId, timeout);
    });
  }

  /**
   * 응답이 MQTT 또는 기타 채널을 통해 도착했을 때 호출됨
   */
  resolve(transactionId: string, response: string): void {
    const resolver = this.responseMap.get(transactionId);
    if (resolver && response == '0') {
      this.logger.log(`Resolving response for transactionId: ${transactionId}`);
      clearTimeout(this.timeoutMap.get(transactionId));
      this.timeoutMap.delete(transactionId);
      this.responseMap.delete(transactionId);
      resolver(response);
    } else {
      this.logger.warn(
        `No pending request for transactionId: ${transactionId}`,
      );
    }
  }

  /**
   * 강제로 삭제 (예: 서버 종료, 취소 등)
   */
  cleanup(transactionId: string): void {
    this.logger.log(`Cleanup transactionId: ${transactionId}`);
    clearTimeout(this.timeoutMap.get(transactionId));
    this.timeoutMap.delete(transactionId);
    this.responseMap.delete(transactionId);
  }
}
