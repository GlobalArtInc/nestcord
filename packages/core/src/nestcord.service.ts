import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ApplicationEmoji, Client } from 'discord.js';

@Injectable()
export class NestcordService implements OnApplicationBootstrap {
  private readonly dataFetchInterval = 60000;

  constructor(private readonly discordClient: Client) {}

  onApplicationBootstrap() {
    this.discordClient.once('ready', () => {
      setInterval(() => this.fetchData(), this.dataFetchInterval);
      this.fetchData();
    });
  }

  getEmojiPlain(name: string) {
    const emoji = this.getEmojisMap().get(name);
    if (!emoji) {
      return '';
    }

    return emoji.toString();
  }

  getEmojisMap(): Map<string, ApplicationEmoji> {
    return new Map(this.discordClient.application.emojis.cache.map((emoji) => [emoji.name, emoji]));
  }

  private async fetchData(): Promise<void> {
    await this.discordClient.application.emojis.fetch();
  }
}
