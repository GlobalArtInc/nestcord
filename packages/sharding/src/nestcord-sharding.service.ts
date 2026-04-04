import { Injectable } from '@nestjs/common';
import { Collection, Shard, ShardingManager } from 'discord.js';
import { NestCordShardingSpawnOptions } from './nestcord-sharding-options.interface';

@Injectable()
export class NestCordShardingService {
  public constructor(private readonly shardingManager: ShardingManager) {}

  /**
   * Returns all spawned shards.
   */
  public get shards(): Collection<number, Shard> {
    return this.shardingManager.shards;
  }

  /**
   * Spawns shards. Resolves once all shards are ready.
   */
  public spawn(options?: NestCordShardingSpawnOptions): Promise<Collection<number, Shard>> {
    return this.shardingManager.spawn(options);
  }

  /**
   * Sends a message to all shards.
   */
  public broadcast(message: unknown): Promise<unknown[]> {
    return this.shardingManager.broadcast(message);
  }

  /**
   * Evaluates a script on all shards and returns the results.
   */
  public broadcastEval<T>(
    fn: Parameters<ShardingManager['broadcastEval']>[0],
    options?: Parameters<ShardingManager['broadcastEval']>[1],
  ): Promise<T[]> {
    return this.shardingManager.broadcastEval(fn, options as never) as Promise<T[]>;
  }

  /**
   * Fetches a property from all shards' clients and returns the values as an array.
   */
  public fetchClientValues(prop: string, shard?: number): Promise<unknown> {
    return this.shardingManager.fetchClientValues(prop, shard);
  }

  /**
   * Kills and restarts all shards.
   */
  public respawnAll(options?: {
    shardDelay?: number;
    respawnDelay?: number;
    timeout?: number;
  }): Promise<Collection<number, Shard>> {
    return this.shardingManager.respawnAll(options);
  }
}
