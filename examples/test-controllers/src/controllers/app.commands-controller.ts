import { Controller, Injectable, Logger, UseInterceptors } from '@nestjs/common';
import { Context, DeferCommandInterceptor, SlashCommand, SlashCommandContext } from '../../../../packages';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

@Controller()
@Injectable()
export class AppCommandsController {
  private readonly logger = new Logger(AppCommandsController.name);

  @SlashCommand({
    name: 'ping',
    description: 'Ping command',
  })
  @UseInterceptors(DeferCommandInterceptor)
  onPingCommand(@Context() [interaction]: SlashCommandContext) {
    this.logger.log(`Ping command called by ${interaction.user.username}`);
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents([
      new ButtonBuilder().setCustomId('ping/pong').setStyle(ButtonStyle.Success).setLabel('Ping'),
    ]);

    return interaction.followUp({
      content: 'Pong!',
      components: [row],
    });
  }
}
