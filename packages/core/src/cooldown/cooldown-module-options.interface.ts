/** Options for in-memory storage (default). Resets on restart. */
export interface MemoryStorageConfig {
  type: 'memory';
}

/** Options for file-based storage. Survives restarts; suitable for single-process bots. */
export interface FileStorageConfig {
  type: 'file';
  /** Path to the JSON file. Defaults to `./nestcord-cooldowns.json`. */
  path?: string;
}

/** Subset of ioredis / node-redis connection options accepted by {@link RedisStorageConfig}. */
export interface RedisConnectionOptions {
  url?: string;
  host?: string;
  port?: number;
  password?: string;
  db?: number;
}

/**
 * Options for Redis-backed storage. Survives restarts and is shared across all shards/processes.
 * Requires `ioredis` to be installed: `pnpm add ioredis`.
 */
export interface RedisStorageConfig {
  type: 'redis';
  options?: RedisConnectionOptions;
}

export type CooldownStorageConfig = MemoryStorageConfig | FileStorageConfig | RedisStorageConfig;

/** Configuration options for {@link NestCordCooldownModule}. */
export interface CooldownModuleOptions {
  /**
   * Storage backend used to track per-user cooldown timestamps.
   * Defaults to `{ type: 'memory' }` when omitted.
   */
  storage?: CooldownStorageConfig;
}
