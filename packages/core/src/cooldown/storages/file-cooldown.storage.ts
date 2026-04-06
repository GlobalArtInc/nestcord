import { Injectable, OnModuleInit } from '@nestjs/common';
import { mkdir, readFile, writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { CooldownStorage } from './cooldown-storage.interface';

interface FileStore {
  [key: string]: { timestamp: number; expiresAt: number };
}

/**
 * File-based storage that persists cooldowns to a JSON file on disk.
 * Survives bot restarts; suitable for single-process bots without Redis.
 *
 * @example
 * import { FileCooldownStorage, COOLDOWN_STORAGE } from '@globalart/nestcord';
 *
 * { provide: COOLDOWN_STORAGE, useFactory: () => new FileCooldownStorage('./cooldowns.json') }
 */
@Injectable()
export class FileCooldownStorage implements CooldownStorage, OnModuleInit {
  private readonly path: string;
  private store: FileStore = {};
  private flushTimer: NodeJS.Timeout | null = null;

  constructor(filePath = './nestcord-cooldowns.json') {
    this.path = resolve(filePath);
  }

  public async onModuleInit(): Promise<void> {
    await mkdir(dirname(this.path), { recursive: true });
    try {
      const raw = await readFile(this.path, 'utf8');
      this.store = JSON.parse(raw) as FileStore;
      this.evictExpired();
    } catch {
      this.store = {};
    }
  }

  public async get(key: string): Promise<number | null> {
    const entry = this.store[key];
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      delete this.store[key];
      this.schedulFlush();
      return null;
    }
    return entry.timestamp;
  }

  public async set(key: string, timestamp: number, ttl: number): Promise<void> {
    this.store[key] = { timestamp, expiresAt: timestamp + ttl };
    this.schedulFlush();
  }

  private evictExpired(): void {
    const now = Date.now();
    for (const key of Object.keys(this.store)) {
      if (now > this.store[key].expiresAt) delete this.store[key];
    }
  }

  /** Debounce disk writes to avoid hammering the filesystem on every command. */
  private schedulFlush(): void {
    if (this.flushTimer) return;
    this.flushTimer = setTimeout(async () => {
      this.flushTimer = null;
      await writeFile(this.path, JSON.stringify(this.store), 'utf8');
    }, 500);
  }
}
