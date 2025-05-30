import { Injectable, Logger } from '@nestjs/common';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { Context, SlashCommand, SlashCommandContext, TextCommand, TextCommandContext } from '../../../packages';

@Injectable()
export class AppGateway {
  private readonly logger = new Logger(AppGateway.name);

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
