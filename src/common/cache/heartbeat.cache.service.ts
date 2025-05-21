import { Injectable } from '@nestjs/common';
import { parseTimestamp, formatDuration } from '../utils/date.format';

@Injectable()
export class HeartbeatCacheService {
  private readonly latestTidMap = new Map<string, string>(); // key → tid 문자열

  add(key: string, tid: string) {
    this.latestTidMap.set(key, tid);
  }

  get(key: string): string | null {
    const tid = this.latestTidMap.get(key);
    if (tid) {
      return tid;
    } else {
      return null;
    }
  }

  hasTidValue(tid: string): boolean {
    return Array.from(this.latestTidMap.values()).includes(tid);
  }

  getRttFromTid(tid: string, update_time: string): string | null {
    // tid로 해당 key를 찾음 (O(n))
    for (const [key, storedTid] of this.latestTidMap.entries()) {
      if (storedTid === tid) {
        const sent = parseTimestamp(tid).getTime();
        const received = parseTimestamp(update_time).getTime();
        return formatDuration(received - sent);
      }
    }
    return null;
  }

  removeTid(tid: string) {
    for (const [key, value] of this.latestTidMap.entries()) {
      if (value === tid) {
        this.latestTidMap.delete(key);
        return;
      }
    }
  }
}
