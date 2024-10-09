import { Injectable } from '@nestjs/common';
import { ChatInputCommandInteraction, Client, GuildMember, Message, TextChannel, VoiceChannel } from 'discord.js';
import { LavalinkManager, Player } from 'lavalink-client';

@Injectable()
export class NestCordLavalinkService {
  public constructor(
    private readonly lavalinkManager: LavalinkManager,
    private readonly client: Client,
  ) {}

  public lavalinkUtils = this.lavalinkManager.utils;

  public extractInfoForPlayer(base: Message | ChatInputCommandInteraction) {
    const guildId = base.guildId;
    const textChannelId = base.channelId;
    let voiceChannelId: string | null = null;

    if (base instanceof Message) {
      voiceChannelId = base.member?.voice.channelId ?? null;
    } else if (base instanceof ChatInputCommandInteraction) {
      voiceChannelId = (base.member as GuildMember)?.voice.channelId ?? null;
    }

    return { guildId, voiceChannelId, textChannelId };
  }

  public async extractPlayerData(player: Player) {
    return {
      guild: await this.client.guilds.fetch(player.guildId),
      voiceChannel: (await this.client.channels.fetch(player.voiceChannelId)) as VoiceChannel,
      textChannel: (await this.client.channels.fetch(player.textChannelId)) as TextChannel,
    };
  }
}
