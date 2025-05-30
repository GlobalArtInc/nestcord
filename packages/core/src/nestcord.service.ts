import { Inject, Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { ApplicationEmoji, Client, REST } from 'discord.js';
import { DiscordApplicationAsset } from './interfaces';
import { NestCordModuleOptions } from './nestcord-options.interface';
import { DISCORD_CDN_URL } from './nestcord.consts';
import { NESTCORD_MODULE_OPTIONS } from './nestcord.module-definition';

@Injectable()
export class NestCordService implements OnApplicationBootstrap {
  private readonly dataFetchInterval = 60000;
  private readonly logger = new Logger(NestCordService.name);
  private assetsMap: Map<string, DiscordApplicationAsset> = new Map();
  private emojisMap: Map<string, ApplicationEmoji> = new Map();
  private proxyConfig?: string | { host: string; port: number; auth?: { username: string; password: string } };

  constructor(
    @Inject(NESTCORD_MODULE_OPTIONS)
    private readonly options: NestCordModuleOptions,
    private readonly discordClient: Client,
  ) {
    this.setupProxy();
  }

  onApplicationBootstrap() {
    this.discordClient.once('ready', () => {
      this.updateData();
      setInterval(() => this.updateData(), this.dataFetchInterval);
    });
  }

  private setupProxy(): void {
    if (this.options.proxyPath) {
      this.proxyConfig = this.options.proxyPath;
      const maskedPath = this.maskProxyUrl(this.options.proxyPath);
      this.logger.log(`Proxy path configured: ${maskedPath}`);
      process.env.HTTPS_PROXY = this.options.proxyPath;
      process.env.HTTP_PROXY = this.options.proxyPath;
    } else if (this.options.proxy) {
      const { host, port, auth, protocol = 'http' } = this.options.proxy;
      const authString = auth ? `${auth.username}:${auth.password}@` : '';
      const proxyUrl = `${protocol}://${authString}${host}:${port}`;

      this.proxyConfig = this.options.proxy;
      const maskedHost = this.maskString(host);
      this.logger.log(`Proxy configured: ${protocol}://${maskedHost}:${port}`);
      process.env.HTTPS_PROXY = proxyUrl;
      process.env.HTTP_PROXY = proxyUrl;
    }
  }

  private maskProxyUrl(url: string): string {
    try {
      const proxyUrl = new URL(url);
      const maskedHost = this.maskString(proxyUrl.hostname);
      return `${proxyUrl.protocol}//${proxyUrl.username ? '****:****@' : ''}${maskedHost}:${proxyUrl.port}`;
    } catch {
      return '****';
    }
  }

  private maskString(str: string): string {
    if (!str) return '';
    const visibleChars = 2;
    const start = str.slice(0, visibleChars);
    return start + '*'.repeat(Math.max(str.length - visibleChars, 3));
  }

  getProxyConfig(): string | { host: string; port: number; auth?: { username: string; password: string } } | undefined {
    return this.proxyConfig;
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
    await Promise.allSettled([this.fetchEmojis(), this.fetchApplicationAssets()]);
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
    return `${DISCORD_CDN_URL}/app-assets/${this.discordClient.user.id}/${assetId}.png`;
  }
}
