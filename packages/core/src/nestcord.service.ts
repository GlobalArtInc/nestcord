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

  getApplicationEmoji(name: string) {
    return this.getApplicationEmojisMap().get(name) || null;
  }

  getApplicationEmojiPlain(name: string) {
    const emoji = this.getApplicationEmojisMap().get(name);
    if (!emoji) {
      return '';
    }

    return emoji.toString();
  }

  getApplicationEmojisMap(): Map<string, ApplicationEmoji> {
    return new Map(this.discordClient.application.emojis.cache.map((emoji) => [emoji.name, emoji]));
  }

  private async fetchData(): Promise<void> {
    await this.discordClient.application.emojis.fetch();
  }
}
