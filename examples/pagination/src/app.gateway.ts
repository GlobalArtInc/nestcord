import { LOCALIZATION_ADAPTER } from '../../../packages/localization/providers/localization-adapter.provider';
import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Once, Context, ContextOf, SlashCommand, SlashCommandContext } from "../../../packages/core";
import { CurrentTranslate, DefaultLocalizationAdapter, TranslationFn, localizationMapByKey } from '../../../packages/localization';
import { NestCordPaginationService, PageBuilder } from '../../../packages';

@Injectable()
export class AppGateway implements OnModuleInit {
  private readonly logger = new Logger(AppGateway.name);

  public constructor(private readonly paginationService: NestCordPaginationService) {}

  public onModuleInit() {
    return this.paginationService.register(builder =>
      builder
        .setCustomId('test')
        .setPages([
          new PageBuilder().setContent('Page 1'),
          new PageBuilder().setContent('Page 2'),
          new PageBuilder().setContent('Page 3'),
          new PageBuilder().setContent('Page 4'),
          new PageBuilder().setContent('Page 5')
        ])
        .setMaxPages(5)
    );
}

  @Once('ready')
  onBotReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);
  }

  @SlashCommand({
    name: 'ping',
    description: 'Ping command',
  })
  async onPingCommand(@Context() [interaction]: SlashCommandContext) {
    this.logger.log(`Ping command called by ${interaction.user.username}`);
    const pagination = this.paginationService.get('test');
    const page = await pagination.build();

    return interaction.reply(page);
  }
}