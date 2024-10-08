import { GatewayIntentBits, Partials } from 'discord.js';
import { NestCordModule } from '../../../packages/core';
import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { NestCordStatReporterModule } from '../../../packages';

@Module({
  imports: [
    NestCordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
      ],
      partials: [Partials.Message, Partials.Channel, Partials.Reaction],
      skipRegistration: true,
    }),
    NestCordStatReporterModule.forRoot({
      services: [
        {
          name: 'top.gg',
          actions: [
            {
              name: 'stats',
              url: 'https://webhook.site/5de44490-7d68-4641-b57e-f43fc8cdacea',
              bodyData: { server_count: '{{serverCount}}', shard_count: '{{shardCount}}' },
            },
          ],
          headerData: {
            Authorization: process.env.TOP_GG_TOKEN,
          },
          schedule: '*/5 * * * * *',
        },
      ],
      log: true,
    }),
  ],
  providers: [AppGateway],
})
export class AppModule {}
