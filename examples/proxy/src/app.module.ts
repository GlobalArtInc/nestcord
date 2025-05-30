import { Module } from '@nestjs/common';
import { GatewayIntentBits, Partials } from 'discord.js';
import { NestCordModule } from '../../../packages/core';
import { AppGateway } from './app.gateway';

@Module({
  imports: [
    NestCordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Message, Partials.Channel],
      proxyPath: process.env.PROXY_PATH,
      proxy: process.env.PROXY_HOST
        ? {
            host: process.env.PROXY_HOST,
            port: parseInt(process.env.PROXY_PORT || '8080'),
            protocol: (process.env.PROXY_PROTOCOL as 'http' | 'https') || 'http',
            auth: process.env.PROXY_USER
              ? {
                  username: process.env.PROXY_USER,
                  password: process.env.PROXY_PASS || '',
                }
              : undefined,
          }
        : undefined,
    }),
  ],
  providers: [AppGateway],
})
export class AppModule {}
