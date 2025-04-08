// status/status-store.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusStoreService {
  private lastTransferMap: Map<string, string> = new Map();

  hasChanged(id: string, current: any): boolean {
    const key = id;
    const prevJson = this.lastTransferMap.get(key);
    const currJson = JSON.stringify(current);

    const isChanged = prevJson !== currJson;
    if (isChanged) {
      this.lastTransferMap.set(key, currJson);
    }

    return isChanged;
  }

  getAll(): Record<string, string> {
    return Object.fromEntries(this.lastTransferMap.entries());
  }
}
