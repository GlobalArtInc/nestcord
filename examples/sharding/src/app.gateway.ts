import { Injectable, Logger } from '@nestjs/common';
import { Once, Context, ContextOf, On, SlashCommand, SlashCommandContext } from '../../../packages';

@Injectable()
export class AppGateway {
  private readonly logger = new Logger(AppGateway.name);

  @Once('ready')
  onBotReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.tag}`);
  }

  @On('debug')
  onDebug(@Context() [debug]: ContextOf<'debug'>) {
    this.logger.debug(debug);
  }

  @SlashCommand({
    name: 'ping',
    description: 'Ping command',
  })
  onPingCommand(@Context() { interaction }: SlashCommandContext) {
    this.logger.log(`Ping command called by ${interaction.user.username}`);
    return interaction.reply({
      content: 'Pong!',
    });
  }
}
