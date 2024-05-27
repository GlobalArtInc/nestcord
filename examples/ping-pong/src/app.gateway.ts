import { LOCALIZATION_ADAPTER } from '../../../packages/localization/providers/localization-adapter.provider';
import { Inject, Injectable, Logger, UseInterceptors } from '@nestjs/common';
import {
  Once,
  Context,
  ContextOf,
  SlashCommand,
  SlashCommandContext,
  TextCommand,
  TextCommandContext, Button, ButtonContext, DeferCommandInterceptor,
} from '../../../packages';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

@Injectable()
export class AppGateway {
  private readonly logger = new Logger(AppGateway.name);

  @Once('ready')
  onBotReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);
  }

  @UseInterceptors(DeferCommandInterceptor)
  @Button('ping/pong')
  onPingButton(@Context() [interaction]: ButtonContext) {
    setTimeout(() => interaction.followUp({ content: 'Pong!' }), 5000);
  }

  @SlashCommand({
    name: 'ping',
    description: 'Ping command',
  })
  onPingCommand(@Context() [interaction]: SlashCommandContext) {
    this.logger.log(`Ping command called by ${interaction.user.username}`);
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder().setCustomId('ping/pong').setStyle(ButtonStyle.Success).setLabel('Ping'),
    ]);

    return interaction.reply({
      content: 'Pong!',
      components: [row],
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
