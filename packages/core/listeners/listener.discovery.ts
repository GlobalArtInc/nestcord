import { NestCordBaseDiscovery } from '../context';

export interface ListenerMeta {
  type: 'once' | 'on';
  event: string | symbol | number;
}

/**
 * Represents a listener discovery.
 */
export class ListenerDiscovery extends NestCordBaseDiscovery<ListenerMeta> {
  public getType() {
    return this.meta.type;
  }

  public getEvent() {
    return this.meta.event.toString();
  }

  public isListener(): this is ListenerDiscovery {
    return true;
  }

  public override toJSON(): Record<string, any> {
    return this.meta;
  }
}
