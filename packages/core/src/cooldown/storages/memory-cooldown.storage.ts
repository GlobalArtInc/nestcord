import { Injectable } from '@nestjs/common';
import { CooldownStorage } from './cooldown-storage.interface';

interface Entry {
  timestamp: number;
  expiresAt: number;
}

/** Default in-process storage — zero dependencies, resets on restart. */
@Injectable()
export class MemoryCooldownStorage implements CooldownStorage {
  private readonly store = new Map<string, Entry>();

  public async get(key: string): Promise<number | null> {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.timestamp;
  }

  public async set(key: string, timestamp: number, ttl: number): Promise<void> {
    this.store.set(key, { timestamp, expiresAt: timestamp + ttl });
  }
}
