import { Injectable, Logger, OnModuleInit, Param, UseInterceptors } from '@nestjs/common';
import {
  Once,
  Context,
  ContextOf,
  SlashCommand,
  SlashCommandContext,
  On,
  Button,
  ComponentParam,
  ButtonContext,
} from '../../../packages/core';
import { ButtonAppearance, NestCordPaginationService, PageBuilder } from '../../../packages';
import { ButtonStyle } from 'discord.js';

enum PageEnum {
  TEXT1 = 1,
  TEXT2 = 2,
  TEXT3 = 3,
}

@Injectable()
export class AppGateway implements OnModuleInit {
  private readonly logger = new Logger(AppGateway.name);
  private readonly paginationId = 'page';

  public constructor(private readonly paginationService: NestCordPaginationService) {}

  public onModuleInit(): void {
    this.paginationService.register((builder) => builder.setCustomId('help'));
  }

  @Once('ready')
  onBotReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.tag}`);
  }

  @SlashCommand({
    name: 'ping',
    description: 'Ping command',
  })
  async onPingCommand(@Context() [interaction]: SlashCommandContext) {
    this.logger.log(`Ping command called by ${interaction.user.username}`);
    const pagination = this.paginationService.get('help');
    pagination.setButtons(this.setButtons()).setPages(this.setPages());
    const page = await pagination.build();

    return interaction.reply(page);
  }

  @Button('nestcord-pagination/help/:page')
  async ButtonInteraction(@Context() [interaction]: ButtonContext, @ComponentParam('page') pageName: string) {
    const pagination = this.paginationService.get('help');
    pagination.setButtons(this.setButtons());
    pagination.setPages(this.setPages());
    const pageIndex = PageEnum[pageName.toUpperCase()];
    const page = await pagination.build(pageIndex);

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
  private setButtons(): ButtonAppearance[][] {
    return [
      [
        { label: 'Text 1', style: ButtonStyle.Primary, customId: 'text1' },
        { label: 'Text 2', style: ButtonStyle.Primary, customId: 'text2' },
        { label: 'Text 3', style: ButtonStyle.Primary, customId: 'text3' },
      ],
    ];
  }
}
