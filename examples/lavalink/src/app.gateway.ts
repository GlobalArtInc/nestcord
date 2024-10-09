import { Injectable, Logger } from '@nestjs/common';
import {
  Context,
  OnNodeManager,
  LavalinkManagerContextOf,
  NodeManagerContextOf,
  OnLavalinkManager,
  SlashCommand,
  PlayerManager,
  NestCordLavalinkService,
  SlashCommandContext,
  Options,
} from '../../../packages';
import { QueryDto } from './app.dto';

@Injectable()
export class AppGateway {
  constructor(
    private readonly playerManager: PlayerManager,
    private readonly lavalinkService: NestCordLavalinkService,
  ) {}

  private readonly logger = new Logger(AppGateway.name);

  @OnNodeManager('connect')
  public onConnect(@Context() [node]: NodeManagerContextOf<'connect'>) {
    this.logger.log(`Node: ${node.options.host} Connected`);
  }

  @OnLavalinkManager('playerCreate')
  public onPlayerCreate(@Context() [player]: LavalinkManagerContextOf<'playerCreate'>) {
    this.logger.log(`Player created at ${player.guildId}`);
  }

  @SlashCommand({
    name: 'play',
    description: 'play a track',
  })
  async handlePlay(@Context() [interaction]: SlashCommandContext, @Options() { query, source }: QueryDto) {
    const player =
      this.playerManager.get(interaction.guild.id) ??
      this.playerManager.create({
        ...this.lavalinkService.extractInfoForPlayer(interaction),
        // optional configurations:
        selfDeaf: true,
        selfMute: false,
        volume: 50,
      });

    await player.connect();

    const res = await player.search(
      {
        query,
        source: source ?? 'soundcloud',
      },
      interaction.user.id,
    );

    await player.queue.add(res.tracks[0]);
    if (!player.playing) await player.play();

    // It's extremely recommended to use `trackStart` event for this announcement
    return interaction.reply({
      content: `Now playing ${res.tracks[0].info.title}`,
    });
  }

  @SlashCommand({
    name: 'stop',
    description: 'stop a track',
  })
  async handleStop(@Context() [interaction]: SlashCommandContext) {
    const player = this.playerManager.get(interaction.guild.id);
    if (!player) {
      return interaction.reply({
        content: `Player not found`,
      });
    }

    player.stopPlaying();
  }
}
