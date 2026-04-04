import { Provider } from '@nestjs/common';
import { ShardingManager } from 'discord.js';
import { SHARDING_MODULE_OPTIONS } from '../nestcord-sharding.module-definition';
import { NestCordShardingModuleOptions } from '../nestcord-sharding-options.interface';

export const ShardingManagerProvider: Provider<ShardingManager> = {
  provide: ShardingManager,
  useFactory: (options: NestCordShardingModuleOptions) => {
    const { file, autoSpawn, spawnOptions, ...managerOptions } = options;
    return new ShardingManager(file, managerOptions);
  },
  inject: [SHARDING_MODULE_OPTIONS],
};
