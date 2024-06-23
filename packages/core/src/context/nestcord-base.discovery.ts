import { Reflector } from '@nestjs/core';
import { ContextMenuDiscovery, SlashCommandDiscovery } from '../commands';
import { MessageComponentDiscovery } from '../message-components';
import { ListenerDiscovery } from '../listeners';
import { TextCommandDiscovery } from '../text-commands';
import { ModalDiscovery } from '../modals';

interface DiscoveredItem {
  class: any;
  handler?: (...args: unknown[]) => void;
}

export abstract class NestCordBaseDiscovery<T = unknown> {
  protected readonly reflector = new Reflector();

  protected discovery: DiscoveredItem;

  // eslint-disable-next-line @typescript-eslint/ban-types
  protected contextCallback: Function;

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

  // eslint-disable-next-line @typescript-eslint/ban-types
  public setContextCallback(fn: Function) {
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

  public abstract toJSON(): Record<string, any>;
}
