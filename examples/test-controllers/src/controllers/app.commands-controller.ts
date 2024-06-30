import { Controller, Logger } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from '../../../../packages';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

@Controller()
export class AppCommandsController {
  private readonly logger = new Logger(AppCommandsController.name);

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
}
