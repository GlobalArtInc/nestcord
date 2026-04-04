import { Injectable, Logger } from '@nestjs/common';
import { Shard } from 'discord.js';
import {
  OnShardingManager,
  OnShard,
  NestCordShardingService,
} from '../../../packages/sharding/src';

@Injectable()
export class ManagerListener {
  private readonly logger = new Logger(ManagerListener.name);

  @OnShardingManager('shardCreate')
  onShardCreate(shard: Shard) {
    // logic
  }

  @OnShard('ready')
  onShardReady(shard: Shard) {
    // logic
  }

  @OnShard('reconnecting')
  onShardReconnecting(shard: Shard) {
    // logic
  }

  @OnShard('death')
  onShardDeath(shard: Shard) {
    // logic
  }

  @OnShard('error')
  onShardError([shard, error]: [Shard, Error]) {
    console.log('error');
    this.logger.error(`Shard #${shard.id} error: ${error.message}`);
  }
}
