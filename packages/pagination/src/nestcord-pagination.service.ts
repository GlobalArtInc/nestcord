import { Inject, Injectable } from '@nestjs/common';
import { PaginationBuilder } from './helpers';
import { NestCordPaginationOptions } from './interfaces';
import { MODULE_OPTIONS_TOKEN } from './nestcord-pagination.module-definition';
import { PaginationAction } from './enums';
import { ButtonStyle } from 'discord.js';

@Injectable()
export class NestCordPaginationService {
  private static readonly DEFAULT_OPTIONS: NestCordPaginationOptions = {
    allowTraversal: false,
    allowSkip: false,
    buttons: {
      [PaginationAction.First]: {
        label: 'First',
        emoji: '⏮️',
        style: ButtonStyle.Primary,
      },
      [PaginationAction.Back]: {
        label: 'Previous',
        emoji: '⏪',
        style: ButtonStyle.Primary,
      },
      [PaginationAction.Next]: {
        label: 'Next',
        emoji: '⏩',
        style: ButtonStyle.Primary,
      },
      [PaginationAction.Last]: {
        label: 'Last',
        emoji: '⏭️',
        style: ButtonStyle.Primary,
      },
      [PaginationAction.Traverse]: {
        label: 'Traverse',
        emoji: '🔢',
        style: ButtonStyle.Primary,
      },
    },
  };

  private readonly cache = new Map<string, PaginationBuilder>();

  public constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: NestCordPaginationOptions,
  ) {
    this.options = options;
  }

  public register(factory: (builder: PaginationBuilder) => PaginationBuilder): PaginationBuilder {
    const builder = factory(new PaginationBuilder(this.options));
    this.cache.set(builder.customId, builder);

    return builder;
  }

  public get(customId: string): PaginationBuilder {
    return this.cache.get(customId);
  }

  public delete(customId: string): boolean {
    return this.cache.delete(customId);
  }
}
