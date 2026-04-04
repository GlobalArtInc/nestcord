import { Module, OnModuleInit } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { Shard, ShardingManager } from 'discord.js';
import { EventEmitter } from 'node:events';
import { ShardingListener } from './decorators';
import { ShardingListenerMeta } from './interfaces';
import { ShardingHostType } from './enums';

interface ExecutableListener extends ShardingListenerMeta {
  run: (...args: unknown[]) => void;
}

@Module({
  imports: [DiscoveryModule],
})
export class ShardingListenersModule implements OnModuleInit {
  public constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly shardingManager: ShardingManager,
  ) {}

  public onModuleInit(): void {
    const groupedListeners = new Map<string, ExecutableListener[]>();

    const wrappers = this.discoveryService.getProviders().filter((wrapper) => {
      const { instance } = wrapper;
      const prototype = instance ? Object.getPrototypeOf(instance) : null;
      return instance && prototype && wrapper.isDependencyTreeStatic();
    });

    for (const wrapper of wrappers) {
      const instance = wrapper.instance;
      const prototype = Object.getPrototypeOf(instance);
      const methods = this.metadataScanner.getAllMethodNames(prototype);

      for (const method of methods) {
        const meta = this.reflector.get<ShardingListenerMeta>(ShardingListener, instance[method]);
        if (!meta) continue;

        const key = `${meta.event}:${meta.host}`;
        const listeners = groupedListeners.get(key) ?? [];
        listeners.push({ ...meta, run: instance[method].bind(instance) });
        groupedListeners.set(key, listeners);
      }
    }

    for (const [key, listeners] of groupedListeners) {
      const [event, host] = key.split(':');

      if (host === ShardingHostType.ShardingManager) {
        /**
         * ShardingManager extends EventEmitter. Casting to EventEmitter lets us
         * register listeners with a dynamic event name without bypassing type safety —
         * EventEmitter.on(event: string) is the correct untyped surface for this.
         */
        (this.shardingManager as EventEmitter).on(event, (...args: unknown[]) => {
          for (const listener of listeners) {
            listener.run(args);
          }
        });
      }

      if (host === ShardingHostType.Shard) {
        /**
         * Shard also extends EventEmitter. We subscribe to shardCreate on the manager
         * so that every new Shard gets the same listener registered on it immediately.
         */
        this.shardingManager.on('shardCreate', (shard: Shard) => {
          (shard as EventEmitter).on(event, (...args: unknown[]) => {
            for (const listener of listeners) {
              listener.run(args);
            }
          });
        });
      }
    }
  }
}
