import { Injectable, Logger } from '@nestjs/common';
import { Context, ContextOf, Once, SlashCommand, SlashCommandContext } from '../../../packages';

@Injectable()
export class ShardGateway {
  private readonly logger = new Logger(ShardGateway.name);

  @Once('ready')
  onReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Shard ${client.shard?.ids.join(',')} logged in as ${client.user.tag}`);
  }

  @SlashCommand({ name: 'ping', description: 'Ping command' })
  async onPing(@Context() [interaction]: SlashCommandContext) {
    await interaction.reply({
      content: `Pong! (Shard ${interaction.guild?.shardId ?? 0})`,
    });
  }
}
