import { NestCordLavaLinkConfigurableModule, LAVALINK_MODULE_OPTIONS } from './nestcord-lavalink.module-definition';
import { Global, Inject, Logger, Module, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';
import * as ProvidersMap from './providers';
import { DestroyReasons, LavalinkManager, NodeManager } from 'lavalink-client';
import { Client } from 'discord.js';
import { LavalinkListenersModule } from './listeners';
import { NestCordLavalinkModuleOptions } from './nestcord-lavalink-options.interface';
import { NestCordLavalinkService } from './nestcord-lavalink.service';

const Providers = Object.values(ProvidersMap);

@Global()
@Module({
  imports: [LavalinkListenersModule],
  providers: [NestCordLavalinkService, ...Providers],
  exports: [NestCordLavalinkService, ...Providers],
})
export class NestCordLavalinkModule
  extends NestCordLavaLinkConfigurableModule
  implements OnModuleInit, OnApplicationShutdown
{
  private readonly logger = new Logger(NestCordLavalinkModule.name);

  public constructor(
    private readonly client: Client,
    private readonly lavalinkManager: LavalinkManager,
    private readonly nodeManager: NodeManager,
    @Inject(LAVALINK_MODULE_OPTIONS)
    private readonly options: NestCordLavalinkModuleOptions,
  ) {
    super();
  }

  public onModuleInit() {
    this.client.on('ready', async () => {
      await this.lavalinkManager.init(
        this.options.client ?? {
          id: this.client.user.id,
          username: this.client.user.username,
        },
      );

      this.logger.log('Lavalink Manager Initialized');
    });

    this.nodeManager.on('error', (node, error) => {
      this.logger.error(`An error occured while connecting to the node: ${node.id}`, error.stack);
    });

    this.client.on('raw', (data) => {
      this.lavalinkManager.sendRawData(data);
    });
  }

  public onApplicationShutdown() {
    this.logger.log('Shutting down NestCord Lavalink Module');
    this.lavalinkManager.removeAllListeners();
    this.lavalinkManager.players.forEach((player) => player.destroy(DestroyReasons.Disconnected));
    this.lavalinkManager.nodeManager.removeAllListeners();
    this.lavalinkManager.nodeManager.nodes.forEach((node) => node.destroy(DestroyReasons.NodeDestroy));
  }
}
