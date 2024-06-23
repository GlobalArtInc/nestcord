import { ActionRowBuilder, BaseMessageOptions as PageOptions, StringSelectMenuBuilder } from 'discord.js';
import { BasePaginationBuilder } from './base-pagination.builder';
import { ButtonAppearance, MenuAppearance } from '../interfaces';
import { PageBuilder } from './page.builder';
import assert = require('assert');

export class SelectMenuPaginationBuilder extends BasePaginationBuilder {
  private items: MenuAppearance[] = [];
  private pages: { pageId: string; builder: PageBuilder }[] = [];

  public setPages(data: { pageId: string; builder: PageBuilder }[]): this {
    this.pages = data;
    return this;
  }

  private getPagesMap(): Map<string, PageBuilder> {
    return new Map(this.pages.map(({ pageId, builder }) => [pageId, builder]));
  }

  public setSelectMenuItems(value: MenuAppearance[]): this {
    this.items = value;
    return this;
  }

  public async build(page: string): Promise<PageOptions> {
    assert(this.customId, 'Custom id must be set');

    const pageBuilder = this.getPagesMap().get(page);
    assert(pageBuilder, `Page builder not found for page: ${page}`);

    const pageOptions = pageBuilder.build();
    const row = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(this.createMenuItems(this.items));

    return {
      ...pageOptions,
      components: [row, ...(pageOptions.components ?? [])],
    };
  }

  private createMenuItems(items: MenuAppearance[]): StringSelectMenuBuilder {
    return new StringSelectMenuBuilder().setCustomId(`nestcord-pagination/${this.customId}`).addOptions(items);
  }
}
