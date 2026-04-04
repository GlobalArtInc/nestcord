import { NestCordBaseDiscovery } from '../context';

export interface TextCommandMeta {
  name: string;
  description: string;
  aliases?: string[];
}

/**
 * Represents a text command discovery.
 */
export class TextCommandDiscovery extends NestCordBaseDiscovery<TextCommandMeta> {
  public getName() {
    return this.meta.name;
  }

  public getDescription() {
    return this.meta.description;
  }
  public getAliases() {
    return this.meta.aliases ?? [];
  }

  public isTextCommand(): this is TextCommandDiscovery {
    return true;
  }

  public override toJSON(): Record<string, any> {
    return this.meta;
  }
}
