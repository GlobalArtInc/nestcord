import { Reflector } from '@nestjs/core';
import { ContextMenuDiscovery, SlashCommandDiscovery } from '../commands';
import { MessageComponentDiscovery } from '../message-components';
import { ListenerDiscovery } from '../listeners';
import { TextCommandDiscovery } from '../text-commands';
import { ModalDiscovery } from '../modals';

interface DiscoveredItem {
  class: new (...args: unknown[]) => unknown;
  handler?: (...args: unknown[]) => void;
}

export abstract class NestCordBaseDiscovery<T = unknown> {
  protected readonly reflector = new Reflector();

  protected discovery: DiscoveredItem;

  protected contextCallback: (context: unknown, discovery: this) => unknown;

  public constructor(public meta: T) {}

  public getClass() {
    return this.discovery?.class;
  }

  public getHandler() {
    return this.discovery?.handler;
  }

  public setDiscoveryMeta(meta: DiscoveredItem) {
    this.discovery ||= meta;
  }

  public setContextCallback(fn: (context: unknown, discovery: this) => unknown) {
    this.contextCallback ||= fn;
  }

  public execute(context: unknown = []) {
    return this.contextCallback(context, this);
  }

  public isContextMenu(): this is ContextMenuDiscovery {
    return false;
  }

  public isSlashCommand(): this is SlashCommandDiscovery {
    return false;
  }

  public isMessageComponent(): this is MessageComponentDiscovery {
    return false;
  }

  public isListener(): this is ListenerDiscovery {
    return false;
  }

  public isTextCommand(): this is TextCommandDiscovery {
    return false;
  }

  public isModal(): this is ModalDiscovery {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public abstract toJSON(): Record<string, any>;
}
