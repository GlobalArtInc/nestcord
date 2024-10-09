import { Provider } from '@nestjs/common';
import { LAVALINK_MODULE_OPTIONS } from '../nestcord-lavalink.module-definition';
import { LavalinkManager } from 'lavalink-client';
import { NestCordLavalinkModuleOptions } from '../nestcord-lavalink-options.interface';
import { Client } from 'discord.js';

export const LavalinkManagerProvider: Provider<LavalinkManager> = {
  provide: LavalinkManager,
  useFactory: async (client: Client, options: NestCordLavalinkModuleOptions) => {
    return new LavalinkManager({
      sendToShard: (guildId: string, payload: unknown) => client.guilds.cache.get(guildId)?.shard?.send(payload),
      ...options,
    });
  },
  inject: [Client, LAVALINK_MODULE_OPTIONS],
};
