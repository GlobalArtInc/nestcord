import { Shard, ShardingManager } from 'discord.js';
import { ChildProcess } from 'node:child_process';
import { Worker } from 'node:worker_threads';

/**
 * Events emitted by the ShardingManager itself.
 */
export interface NestCordShardingManagerEvents {
  shardCreate: [shard: Shard];
}

/**
 * Events emitted by individual Shard instances.
 * These listeners are registered on every shard as it is created.
 */
export interface NestCordShardEvents {
  death: [shard: Shard, process: ChildProcess | Worker];
  disconnect: [shard: Shard];
  error: [shard: Shard, error: Error];
  message: [shard: Shard, message: unknown];
  ready: [shard: Shard];
  reconnecting: [shard: Shard];
  resume: [shard: Shard];
  spawn: [shard: Shard, process: ChildProcess | Worker];
}

export type NestCordShardingEvents = NestCordShardingManagerEvents & NestCordShardEvents;
