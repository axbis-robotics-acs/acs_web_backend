import { Injectable } from '@nestjs/common';

@Injectable()
export class MqttCacheService {
  private readonly latestTidMap = new Map<string, any>(); // key → tid 문자열

  add<T = any>(key: string, value: T) {
    this.latestTidMap.set(key, value);
  }

  get<T = any>(key: string): T | null {
    return this.latestTidMap.has(key)
      ? (this.latestTidMap.get(key) as T)
      : null;
  }

  hasTidValue<T = any>(value: T): boolean {
    return Array.from(this.latestTidMap.values()).includes(value);
  }

  remove(key: string) {
    this.latestTidMap.delete(key);
  }
}
