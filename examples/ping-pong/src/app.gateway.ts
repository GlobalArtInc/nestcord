import { Injectable, Logger, UseInterceptors } from '@nestjs/common';
import {
  Once,
  Context,
  ContextOf,
  SlashCommand,
  SlashCommandContext,
  TextCommand,
  TextCommandContext,
  Button,
  ButtonContext,
  DeferCommandInterceptor,
  On,
} from '../../../packages';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

@Injectable()
export class AppGateway {
  private readonly logger = new Logger(AppGateway.name);

  @Once('ready')
  onBotReadys(@Context() [client]: ContextOf<'ready'>) {
    this.logger.debug(`Logged as from string`);
  }

  @Once(['ready', 'voiceChannelJoin'])
  onBotReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.debug(`Logged as from array`);
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
