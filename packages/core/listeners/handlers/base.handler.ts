import { Client, ClientEvents } from 'discord.js';
import { Inject } from '@nestjs/common';
import { NestCordEvents } from '../listener.interface';

type OnlyCustomEvents = Exclude<NestCordEvents, ClientEvents>;

export abstract class BaseHandler<Events extends Record<string, Array<unknown>> = OnlyCustomEvents> {
  @Inject(Client)
  private readonly client: Client;

  protected on<K extends keyof Events>(event: K, fn: (args: Events[K]) => void) {
    this.client.on(event as string, (...args: Events[K]) => fn(args));
  }

  protected emit<K extends keyof Events>(event: K, ...args: Events[K]) {
    this.client.emit(event as string, ...args);
  }
}
