import { ShardingManagerOptions } from 'discord.js';

export interface NestCordShardingSpawnOptions {
  /**
   * Number of shards to spawn, or 'auto' to use Discord's recommendation.
   * @default 'auto'
   */
  amount?: number | 'auto';

  /**
   * Delay in milliseconds between each shard spawn.
   * @default 5500
   */
  delay?: number;

  /**
   * Timeout in milliseconds to wait for a shard to become ready.
   * @default 30000
   */
  timeout?: number;
}

export interface NestCordShardingModuleOptions extends ShardingManagerOptions {
  /**
   * Path to the bot script file that each shard will run.
   */
  file: string;

  /**
   * Whether to automatically spawn shards when the module initializes.
   * @default true
   */
  autoSpawn?: boolean;

  /**
   * Options passed to ShardingManager.spawn().
   */
  spawnOptions?: NestCordShardingSpawnOptions;
}
