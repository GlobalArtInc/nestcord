import { Injectable, Logger } from '@nestjs/common';
import {
  Once,
  Context,
  ContextOf,
  SlashCommandContext,
  createCommandGroupDecorator,
  Subcommand,
} from '../../../packages/core';
import { CurrentTranslate, TranslationFn } from '../../../packages/localization';

export const PingCommandDecorator = createCommandGroupDecorator({
  name: 'ping',
  description: 'ping_command',
});

@Injectable()
@PingCommandDecorator()
export class AppGateway {
  private readonly logger = new Logger(AppGateway.name);

  @Once('ready')
  onBotReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);
  }

  @Subcommand({
    name: 'pong',
    description: 'pong_command',
  })
  onPingCommand(@Context() { interaction }: SlashCommandContext, @CurrentTranslate() t: TranslationFn) {
    return interaction.reply({
      content: 'Pong!',
      components: [],
    });
  }
}
