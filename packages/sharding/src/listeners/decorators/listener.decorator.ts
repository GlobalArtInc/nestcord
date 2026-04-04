import { Reflector } from '@nestjs/core';
import { ShardingListenerMeta } from '../interfaces';

/**
 * Decorator that marks a method as a listener for the ShardingManager or a Shard.
 */
export const ShardingListener = Reflector.createDecorator<ShardingListenerMeta>({
  transform: (options) => options,
});
