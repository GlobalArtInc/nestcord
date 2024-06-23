import { PaginatorTypeEnum } from '../enums';
import { NestCordPaginationOptions } from '../interfaces';
import { BaseMessageOptions as PageOptions } from 'discord.js';

export abstract class BasePaginationBuilder {
  public customId: string;

  constructor(public readonly options: NestCordPaginationOptions) {}

  setCustomId(value: string): this {
    this.customId = value;

    return this;
  }

  public abstract build(args: unknown): Promise<PageOptions>;
}
