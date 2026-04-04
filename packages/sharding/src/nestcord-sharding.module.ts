import { Global, Inject, Logger, Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { ShardingManager } from 'discord.js';
import { NestCordShardingConfigurableModule, SHARDING_MODULE_OPTIONS } from './nestcord-sharding.module-definition';
import { NestCordShardingModuleOptions } from './nestcord-sharding-options.interface';
import { NestCordShardingService } from './nestcord-sharding.service';
import { ShardingListenersModule } from './listeners';
import * as ProvidersMap from './providers';

const Providers = Object.values(ProvidersMap);

@Global()
@Module({
  imports: [ShardingListenersModule],
  providers: [NestCordShardingService, ...Providers],
  exports: [NestCordShardingService, ...Providers],
})
export class NestCordShardingModule
  extends NestCordShardingConfigurableModule
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(NestCordShardingModule.name);

  public constructor(
    private readonly shardingManager: ShardingManager,
    @Inject(SHARDING_MODULE_OPTIONS)
    private readonly options: NestCordShardingModuleOptions,
  ) {
    super();
  }

  public async onApplicationBootstrap(): Promise<void> {
    if (this.options.autoSpawn === false) {
      return;
    }

    this.logger.log('Spawning shards...');
    const shards = await this.shardingManager.spawn(this.options.spawnOptions);
    this.logger.log(`${shards.size} shard(s) spawned successfully`);
  }

  public onApplicationShutdown(): void {
    this.logger.log('Shutting down NestCord Sharding Module');
    this.shardingManager.shards.forEach((shard) => shard.kill());
  }
}
