import { Global, Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { CustomListener, CustomListenerHandler, Listener } from './decorators';
import { Client } from 'discord.js';
import { ExplorerService } from '../nestcord-explorer.service';
import { ListenerDiscovery } from './listener.discovery';
import { DiscoveryModule, DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import * as CustomListeners from './handlers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { BaseHandler, ...listeners } = CustomListeners;

@Global()
@Module({
  imports: [DiscoveryModule],
  providers: Object.values(listeners),
})
export class ListenersModule implements OnModuleInit, OnApplicationBootstrap {
  public constructor(
    private readonly client: Client,
    private readonly explorerService: ExplorerService<ListenerDiscovery>,
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly reflector: Reflector,
  ) {}

  public onModuleInit() {
    const explorer = this.explorerService.explore(Listener.KEY);

    explorer.forEach((listener) => {
      const eventType = listener.getType();
      const event = listener.getEvent();

      if (Array.isArray(event)) {
        event.forEach((e) => {
          this.client[eventType](e, (...args) => listener.execute(args));
        });
      } else {
        this.client[eventType](event, (...args) => listener.execute(args));
      }
    });
  }

  public onApplicationBootstrap() {
    const wrappers = this.discoveryService.getProviders({
      metadataKey: CustomListener.KEY,
    });

    for (const wrapper of wrappers) {
      const customListener = this.discoveryService.getMetadataByDecorator(CustomListener, wrapper);

      const instance = wrapper.instance;
      const prototype = Object.getPrototypeOf(instance);
      const methods = this.metadataScanner
        .getAllMethodNames(prototype)
        .filter((method) => this.reflector.get(CustomListenerHandler, prototype[method]));

      this.client.on(customListener, (...args) => {
        for (const method of methods) {
          instance[method](args);
        }
      });
    }
  }
}
