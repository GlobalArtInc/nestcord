import { LOCALIZATION_ADAPTER } from '../../../packages/localization/providers/localization-adapter.provider';
import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  Once,
  Context,
  ContextOf,
  SlashCommand,
  SlashCommandContext,
  TextCommand,
  TextCommandContext,
} from '../../../packages';

@Injectable()
export class AppGateway {
  private readonly logger = new Logger(AppGateway.name);

  @Once('ready')
  onBotReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);
  }

  @SlashCommand({
    name: 'ping',
    description: 'Ping command',
  })
  onPingCommand(@Context() [interaction]: SlashCommandContext) {
    this.logger.log(`Ping command called by ${interaction.user.username}`);
    return interaction.reply({
      content: 'Pong!',
    });
  }

  @TextCommand({
    name: 'ping',
    description: 'Ping command!',
  })
  public onPing(@Context() [message]: TextCommandContext) {
    return message.reply('pong!');
  }
}
