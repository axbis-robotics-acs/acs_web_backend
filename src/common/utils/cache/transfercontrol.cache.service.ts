import { Injectable } from '@nestjs/common';

@Injectable()
export class TransferStateCacheService {
  private readonly TransferCache = new Map<string, { transfer_st: string }>();

  add(key: string, state: { transfer_st: string }) {
    this.TransferCache.set(key, state);
  }

  get(key: string): { transfer_st: string } | null {
    return this.TransferCache.get(key) ?? null;
  }

  hasTidValue(state: { transfer_st: string }): boolean {
    return Array.from(this.TransferCache.values()).includes(state);
  }

  remove(key: string) {
    if (this.TransferCache.has(key)) {
      this.TransferCache.delete(key);
    } else {
      console.log(`Key ${key} not found in TransferCache.`);
    }
  }

  entries(): IterableIterator<[string, { transfer_st: string }]> {
    return this.TransferCache.entries();
  }
}
