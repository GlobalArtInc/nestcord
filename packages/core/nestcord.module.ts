import { Global, Inject, Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { Client } from 'discord.js';
import { ConfigurableModuleClass, NESTCORD_MODULE_OPTIONS } from './nestcord.module-definition';
import { NestCordModuleOptions } from './nestcord-options.interface';
import { CommandsModule } from './commands';
import { ListenersModule } from './listeners';
import { MessageComponentsModule } from './message-components';
import { ModalsModule } from './modals';
import { ExplorerService } from './nestcord-explorer.service';
import { TextCommandsModule } from './text-commands';
import { DiscoveryModule } from '@nestjs/core';
import * as ProvidersMap from './providers';

const Providers = Object.values(ProvidersMap);

@Global()
@Module({
  imports: [
    DiscoveryModule,
    CommandsModule,
    ListenersModule,
    MessageComponentsModule,
    ModalsModule,
    TextCommandsModule,
  ],
  providers: [ExplorerService, ...Providers],
  exports: [
    CommandsModule,
    ListenersModule,
    MessageComponentsModule,
    ModalsModule,
    TextCommandsModule,
    ExplorerService,
    ...Providers,
    NESTCORD_MODULE_OPTIONS,
  ],
})
export class NestCordModule extends ConfigurableModuleClass implements OnApplicationBootstrap, OnApplicationShutdown {
  public constructor(
    private readonly client: Client,
    @Inject(NESTCORD_MODULE_OPTIONS)
    private readonly options: NestCordModuleOptions,
  ) {
    super();
  }

  public onApplicationBootstrap() {
    return this.client.login(this.options.token);
  }

  public onApplicationShutdown() {
    return this.client.destroy();
  }
}
