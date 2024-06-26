import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  Once,
  Context,
  ContextOf,
  SlashCommand,
  SlashCommandContext,
  Button,
  ComponentParam,
  ButtonContext,
  StringSelect,
} from '../../../packages/core';
import {
  NESTCORD_PAGINATION_MODULE_OPTIONS,
  NestCordPaginationOptions,
  NestCordPaginationService,
  PaginatorTypeEnum,
  SelectedStrings,
} from '../../../packages';
import { ButtonStyle } from 'discord.js';
import { PageBuilder } from '../../../packages/pagination/src/builders/page.builder';

enum PageEnum {
  TEXT1 = 1,
  TEXT2 = 2,
  TEXT3 = 3,
}

@Injectable()
export class AppGateway implements OnModuleInit {
  private readonly logger = new Logger(AppGateway.name);
  private readonly paginationId = 'page';

  public constructor(
    @Inject(NESTCORD_PAGINATION_MODULE_OPTIONS)
    private readonly options: NestCordPaginationOptions,
    private readonly paginationService: NestCordPaginationService,
  ) {}

  public onModuleInit(): void {
    this.paginationService.register(PaginatorTypeEnum.BUTTONS, (builder) => builder.setCustomId('buttons'));
    this.paginationService.register(PaginatorTypeEnum.SELECT_MENU, (builder) => builder.setCustomId('menus'));
  }

  @Once('ready')
  onBotReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.tag}`);
  }

  @SlashCommand({
    name: 'buttons',
    description: 'Buttons command',
  })
  async onButtonsCommand(@Context() [interaction]: SlashCommandContext) {
    this.logger.log(`Buttons command called by ${interaction.user.username}`);
    const pagination = this.paginationService.get<PaginatorTypeEnum.BUTTONS>('buttons');
    pagination.setButtons(this.setButtons());
    pagination.setPages(this.setPages());
    const page = await pagination.build(1);

    return interaction.reply(page);
  }

  @Button('nestcord-pagination/buttons/:page')
  async ButtonInteraction(@Context() [interaction]: ButtonContext, @ComponentParam('page') pageName: string) {
    const pagination = this.paginationService.get<PaginatorTypeEnum.BUTTONS>('buttons');
    pagination.setButtons(this.setButtons());
    pagination.setPages(this.setPages());
    const pageIndex = PageEnum[pageName.toUpperCase()];
    const page = await pagination.build(pageIndex);

    await interaction.update(page);
  }

  @SlashCommand({
    name: 'menu',
    description: 'Menus command',
  })
  async onMenusCommand(@Context() [interaction]: SlashCommandContext) {
    this.logger.log(`Menus command called by ${interaction.user.username}`);
    const pagination = this.paginationService.get<PaginatorTypeEnum.SELECT_MENU>('menus');
    pagination.setSelectMenuItems(this.setMenuItems());
    pagination.setPages(this.setMenuPages());
    pagination.setCustomOptions(interaction.user.id);
    const page = await pagination.build('page1');

    return interaction.reply(page);
  }

  @StringSelect('nestcord-pagination/menus/:userId')
  async MenusInteraction(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('userId') userId: number,
    @SelectedStrings() selected: string[],
  ) {
    const selectedPage = selected?.[0] || null;
    const pagination = this.paginationService.get<PaginatorTypeEnum.SELECT_MENU>('menus');
    pagination.setSelectMenuItems(this.setMenuItems());
    pagination.setPages(this.setMenuPages());
    const page = await pagination.build(selectedPage);
    console.log(userId);
    await interaction.update(page);
  }

  /**
   * Here you can pass interaction parameters and translate the pages or execute any logic
   * @returns
   */
  private setPages() {
    return [
      new PageBuilder().setContent('Page 1'),
      new PageBuilder().setContent('Page 2'),
      new PageBuilder().setContent('Page 3'),
    ];
  }

  /**
   * Here you can pass interaction parameters and translate the buttons
   * @returns
   */
  private setButtons() {
    return [
      [
        { label: 'Text 1', style: ButtonStyle.Primary, customId: 'text1' },
        { label: 'Text 2', style: ButtonStyle.Primary, customId: 'text2' },
        { label: 'Text 3', style: ButtonStyle.Primary, customId: 'text3' },
      ],
    ];
  }
  private setMenuPages() {
    return [
      {
        pageId: 'page1',
        builder: new PageBuilder().setContent('Page 1'),
      },
      {
        pageId: 'page2',
        builder: new PageBuilder().setContent('Page 2'),
      },
    ];
  }

  private setMenuItems() {
    return [
      {
        label: 'Text 1',
        value: 'page1',
      },
      {
        label: 'Text 2',
        value: 'page2',
      },
    ];
  }
}
