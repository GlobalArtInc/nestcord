import { LOCALIZATION_ADAPTER } from '../../../packages';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Once, Context, ContextOf, SlashCommand, SlashCommandContext, Options } from '../../../packages';
import { CurrentTranslate, DefaultLocalizationAdapter, TranslationFn } from '../../../packages';
import { AppDtos } from './app.dtos';

@Injectable()
export class AppGateway {
  private readonly logger = new Logger(AppGateway.name);

  constructor(@Inject(LOCALIZATION_ADAPTER) private readonly adapter: DefaultLocalizationAdapter) {}

  @Once('ready')
  onBotReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);
    this;
  }

  @SlashCommand({
    name: 'ping',
    description: 'Ping command',
  })
  onPingCommand(@Context() { interaction }: SlashCommandContext, @CurrentTranslate() t: TranslationFn) {
    this.logger.log(`Ping command called by ${interaction.user.username}`);

    return interaction.reply({
      content: t('commands.ping.description', { placeholder: 'replacedPlaceholder' }),
    });
  }

  @SlashCommand({
    name: 'options',
    description: 'Options command',
  })
  onOptions(
    @Context() { interaction }: SlashCommandContext,
    @Options() {}: AppDtos,
    @CurrentTranslate() t: TranslationFn,
  ) {
    this.logger.log(`Options command called by ${interaction.user.username}`);

    return interaction.reply({
      content: t('commands.ping.description'),
    });
  }
}
