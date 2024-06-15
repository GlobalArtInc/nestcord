import { NestCordBaseDiscovery } from '../context';

export interface ListenerMeta {
  type: 'once' | 'on';
  event: string | string[];
}

/**
 * Represents a listener discovery.
 */
export class ListenerDiscovery extends NestCordBaseDiscovery<ListenerMeta> {
  public getType() {
    return this.meta.type;
  }

  public getEvent() {
    return Array.isArray(this.meta.event) ? this.meta.event : this.meta.event.toString();
  }

  public isListener(): this is ListenerDiscovery {
    return true;
  }

  public override toJSON(): ListenerMeta {
    return this.meta;
  }
}
