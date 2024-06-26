import { ActionRowBuilder, BaseMessageOptions as PageOptions, ButtonBuilder, ButtonStyle } from 'discord.js';
import { ButtonAppearance } from '../interfaces';
import { BasePaginationBuilder } from './base-pagination.builder';
import { PageBuilder } from './page.builder';
import assert = require('assert');

type PagesFactory = (page: number, maxPages: number) => Promise<PageBuilder>;

export class ButtonsPaginationBuilder extends BasePaginationBuilder {
  public buttons: ButtonAppearance[][];
  private pages: PageBuilder[] = [];
  private _maxPages: number;
  private pagesFactory: PagesFactory;

  public get maxPages(): number {
    if (this.pages.length) {
      return this.pages.length;
    }

    return this._maxPages || null;
  }

  public set maxPages(value: number) {
    this._maxPages = value;
  }

  public setPages(pages: PageBuilder[]): this {
    this.pages = pages;

    return this;
  }

  setButtons(buttons: ButtonAppearance[][]): this {
    this.buttons = buttons;

    return this;
  }

  public setPagesFactory(factory: PagesFactory): this {
    this.pagesFactory = factory;

    return this;
  }

  public setMaxPages(maxPages: number): this {
    this.maxPages = maxPages;

    return this;
  }

  async build(page = 1): Promise<PageOptions> {
    page = Math.max(1, Math.min(page, this.maxPages)) || 1;
    assert(!!this.customId, 'Custom id must be set');
    assert(!!this.pagesFactory || this.pages.length >= 1, 'Pages factory must be set if no pages are provided');
    assert(this.maxPages !== null, 'Max pages must be set if no pages are provided');
    assert(this.maxPages >= page, `Page ${page} is out of range (max: ${this.maxPages})`);

    const pageBuilder = this.pages[page - 1] || (await this.pagesFactory(page, this.maxPages));
    const pageOptions = pageBuilder.build();
    const row = Object.values(this.buttons).map((buttons) => {
      const component = this.createButtons(buttons);

      return new ActionRowBuilder<ButtonBuilder>().addComponents(component);
    });

    return {
      ...pageOptions,
      components: [...row, ...pageOptions.components],
    };
  }

  private createButtons(buttons: ButtonAppearance[]) {
    return Object.entries(buttons).map(([_, button]) => {
      const builder = new ButtonBuilder();

      builder.setStyle(button.style).setLabel(button.label);

      if (button.emoji) {
        builder.setEmoji(button.emoji);
      }
      if (button.disabled) {
        builder.setDisabled(true);
      }
      if (button.style === ButtonStyle.Link) {
        builder.setURL(button.link);
      } else {
        builder.setCustomId(`nestcord-pagination/${this.customId}/${button.customId}/${button.options || ''}`);
      }

      return builder;
    });
  }
}
