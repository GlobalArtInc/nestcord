import { Injectable, Logger, UseInterceptors } from '@nestjs/common';
import {
  Context,
  SlashCommand,
  SlashCommandContext,
  TextCommand,
  TextCommandContext,
  Button,
  ButtonContext,
  DeferCommandInterceptor,
  Discovery,
  ListenerDiscovery,
  On,
} from '../../../packages';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

@Injectable()
export class AppGateway {
  private readonly logger = new Logger(AppGateway.name);

  @On(['ready', 'voiceChannelJoin', 'voiceChannelLeave'])
  onVoiceChannelEvents(@Discovery() discovery: ListenerDiscovery) {
    const event = discovery.getEvent();
    console.log(event);
    switch (event) {
      case 'voiceChannelJoin':
        this.logger.debug('voiceChannelJoin emit');
        break;
      case 'voiceChannelLeave':
        this.logger.debug('voiceChannelLeave emit');
        break;
      case 'ready':
        this.logger.debug('ready emit');
    }
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
