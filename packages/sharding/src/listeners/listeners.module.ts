import { Logger, Module, OnApplicationBootstrap, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { DiscoveryModule, DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { Shard, ShardingManager } from 'discord.js';
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
  private readonly logger = new Logger(ShardingListenersModule.name);

  public constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
    private readonly shardingManager: ShardingManager,
  ) {}

  public onModuleInit(): void {
    this.registerBaseShardEvents();
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

    const allListeners = [...groupedListeners.values()].flat();

    for (const listener of allListeners) {
      if (listener.host === ShardingHostType.ShardingManager) {
        this.shardingManager[listener.type](listener.event as any, (...args: unknown[]) => {
          listener.run(...args);
        });
      }
    }

    this.shardingManager.on('shardCreate', (shard: Shard) => {
      for (const listener of allListeners) {
        if (listener.host === ShardingHostType.Shard) {
          shard[listener.type](listener.event as any, (...args: unknown[]) => {
            listener.run(shard, ...args);
          });
        }
      }
    });
  }

  private registerBaseShardEvents() {
    this.shardingManager.on('shardCreate', (shard: Shard) => {
      shard.on('spawn', () => {
        this.logger.log(`Shard: [${shard.id}] spawned`);
      });

      shard.on('ready', () => {
        this.logger.log(`Shard: [${shard.id}] is ready`);
      });

      shard.on('death', () => {
        this.logger.error(`Shard: [${shard.id}] is dead`);
      });

      shard.on('error', (err: Error) => {
        this.logger.error(`Error in shard: [${shard.id}]`, err);
        shard.respawn();
      });
    });
  }
}
