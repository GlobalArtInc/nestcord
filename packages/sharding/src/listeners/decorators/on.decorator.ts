import { ShardingListener } from './listener.decorator';
import { ShardingHostType, ShardingListenerType } from '../enums';
import { NestCordShardingManagerEvents, NestCordShardEvents } from '../interfaces';

/**
 * Subscribes a method to an event on the ShardingManager.
 *
 * @example
 * \@OnShardingManager('shardCreate')
 * onShardCreate([shard]: ShardingManagerContextOf<'shardCreate'>) {}
 */
export const OnShardingManager = <K extends keyof NestCordShardingManagerEvents>(event: K) =>
  ShardingListener({
    type: ShardingListenerType.On,
    event,
    host: ShardingHostType.ShardingManager,
  });

/**
 * Subscribes a method to an event on every Shard as it is created.
 *
 * @example
 * \@OnShard('ready')
 * onShardReady([shard]: ShardContextOf<'ready'>) {}
 */
export const OnShard = <K extends keyof NestCordShardEvents>(event: K) =>
  ShardingListener({
    type: ShardingListenerType.On,
    event,
    host: ShardingHostType.Shard,
  });
