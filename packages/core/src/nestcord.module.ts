import { Global, Inject, Module, OnApplicationBootstrap, OnApplicationShutdown } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { Client } from 'discord.js';
import { CommandsModule } from './commands';
import { ListenersModule } from './listeners';
import { MessageComponentsModule } from './message-components';
import { ModalsModule } from './modals';
import { ExplorerService } from './nestcord-explorer.service';
import { NestCordModuleOptions } from './nestcord-options.interface';
import { ConfigurableModuleClass, NESTCORD_MODULE_OPTIONS } from './nestcord.module-definition';
import { NestCordService } from './nestcord.service';
import * as ProvidersMap from './providers';
import { TextCommandsModule } from './text-commands';

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
  providers: [ExplorerService, NestCordService, ...Providers],
  exports: [
    CommandsModule,
    ListenersModule,
    MessageComponentsModule,
    ModalsModule,
    TextCommandsModule,
    ExplorerService,
    NestCordService,
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
