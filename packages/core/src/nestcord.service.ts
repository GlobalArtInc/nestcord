import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ApplicationEmoji, Client, REST } from 'discord.js';
import { NESTCORD_MODULE_OPTIONS } from './nestcord.module-definition';
import { NestCordModuleOptions } from './nestcord-options.interface';
import { DiscordApplicationAsset } from './interfaces';

@Injectable()
export class NestcordService implements OnApplicationBootstrap {
  private readonly dataFetchInterval = 60000;
  private readonly logger = new Logger(NestcordService.name);
  private assetsMap: Map<string, DiscordApplicationAsset> = new Map();
  private emojisMap: Map<string, ApplicationEmoji> = new Map();

  constructor(
    @Inject(NESTCORD_MODULE_OPTIONS)
    private readonly options: NestCordModuleOptions,
    private readonly discordClient: Client,
  ) {}

  onApplicationBootstrap() {
    this.discordClient.once('ready', () => {
      this.updateData();
      setInterval(() => this.updateData(), this.dataFetchInterval);
    });
  }

  getApplicationEmoji(name: string): ApplicationEmoji | null {
    return this.emojisMap.get(name) || null;
  }

  getApplicationAsset(name: string): DiscordApplicationAsset | null {
    return this.assetsMap.get(name) || null;
  }

  getApplicationEmojiPlain(name: string): string {
    const emoji = this.getApplicationEmoji(name);

    return emoji ? emoji.toString() : '';
  }

  private async updateData(): Promise<void> {
    try {
      await this.fetchEmojis();
      await this.fetchApplicationAssets();
    } catch (error) {
      this.logger.error('Error updating data:', error);
    }
  }

  private async fetchEmojis(): Promise<void> {
    try {
      await this.discordClient.application.emojis.fetch();
      this.emojisMap = new Map(this.discordClient.application.emojis.cache.map((emoji) => [emoji.name, emoji]));
    } catch (error) {
      this.logger.error('Error fetching emojis:', error);
    }
  }

  private async fetchApplicationAssets(): Promise<void> {
    const rest = new REST({ version: '10' }).setToken(this.options.token);
    try {
      const assets = await rest.get(`/oauth2/applications/${this.discordClient.user.id}/assets`);
      this.assetsMap = new Map(
        (assets as DiscordApplicationAsset[]).map((asset) => [
          asset.name,
          {
            ...asset,
            url: this.getAssetUrl(asset.id),
          },
        ]),
      );
    } catch (error) {
      this.logger.error('Error fetching assets:', error);
      throw error;
    }
  }

  private getAssetUrl(assetId: string): string {
    return `https://cdn.discordapp.com/app-assets/${this.discordClient.user.id}/${assetId}.png`;
  }
}
