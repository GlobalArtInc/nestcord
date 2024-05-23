import { LOCALIZATION_ADAPTER } from './../../packages/localization/providers/localization-adapter.provider';
import { Inject, Injectable, Logger } from "@nestjs/common";
import { Once, Context, ContextOf, SlashCommand, SlashCommandContext } from "../../packages/core";
import { CurrentTranslate, DefaultLocalizationAdapter, TranslationFn, localizationMapByKey } from '../../packages/localization';

@Injectable()
export class AppGateway {
  private readonly logger = new Logger(AppGateway.name);

  constructor(@Inject(LOCALIZATION_ADAPTER) private readonly adapter: DefaultLocalizationAdapter) {}

  @Once('ready')
  onBotReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);
  }

  @SlashCommand({
    name: 'ping',
    description: 'Ping command',
    // nameLocalizations: localizationMapByKey('commands.ping.name'),
    // descriptionLocalizations: localizationMapByKey('commands.ping.description'),
  })
  onPingCommand(@Context() [interaction]: SlashCommandContext, @CurrentTranslate() t: TranslationFn) {
    this.logger.log(`Ping command called by ${interaction.user.username}`);
    console.log(this.adapter)
    return interaction.reply('pong!');
  }
}