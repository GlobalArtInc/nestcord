import { Inject, Injectable, Logger } from "@nestjs/common";
import { SlashCommand, Context, SlashCommandContext } from "../../../packages/core";
import { CurrentTranslate, DefaultLocalizationAdapter, LOCALIZATION_ADAPTER, TranslationFn } from "../../../packages/localization";

@Injectable()
export class BotService {
  private readonly logger = new Logger(BotService.name);

  constructor(@Inject(LOCALIZATION_ADAPTER) private readonly adapter: DefaultLocalizationAdapter) {}

  @SlashCommand({
    name: 'ping',
    description: 'Ping command',
  })
  onPingCommand(@Context() [interaction]: SlashCommandContext, @CurrentTranslate() t: TranslationFn) {
    this.logger.log(`Ping command called by ${interaction.user.username}`);

    return interaction.reply({
      content: t('commands.ping.description'),
    });
  }
}