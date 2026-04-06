import { CooldownStorage } from './cooldown-storage.interface';

/**
 * Redis-backed storage using an ioredis-compatible client.
 * Cooldown records are stored as plain integer strings and expire via Redis TTL,
 * so they survive bot restarts and are shared across all shards/processes.
 *
 * @example
 * import Redis from 'ioredis';
 * import { RedisCooldownStorage, COOLDOWN_STORAGE } from '@globalart/nestcord';
 *
 * { provide: COOLDOWN_STORAGE, useFactory: () => new RedisCooldownStorage(new Redis()) }
 */
export class RedisCooldownStorage implements CooldownStorage {
  constructor(
    private readonly redis: {
      get(key: string): Promise<string | null>;
      set(key: string, value: string | number, expiryMode: string, time: number): Promise<unknown>;
    },
  ) {}

  public async get(key: string): Promise<number | null> {
    const value = await this.redis.get(key);
    return value !== null ? parseInt(value, 10) : null;
  }

  public async set(key: string, timestamp: number, ttl: number): Promise<void> {
    // PX sets the TTL in milliseconds (ioredis / node-redis v4+ both support this)
    await this.redis.set(key, timestamp, 'PX', ttl);
  }
}
