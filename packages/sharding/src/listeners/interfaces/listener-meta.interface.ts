import { NestCordShardingEvents } from './listener-events.interface';
import { ShardingHostType, ShardingListenerType } from '../enums';

export interface ShardingListenerMeta {
  type: ShardingListenerType;
  event: keyof NestCordShardingEvents;
  host: ShardingHostType;
}
