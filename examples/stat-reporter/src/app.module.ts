import { GatewayIntentBits, Partials } from 'discord.js';
import { NestCordModule } from '../../../packages/core';
import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { NestCordStatReporterModule } from '../../../packages/stat-reporter';
import { CronExpression } from '@nestjs/schedule';

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
          url: 'https://top.gg/api/bots/:bot_id/stats',
          bodyData: { server_count: '{{serverCount}}', shard_count: '{{shardCount}}' },
          headerData: {
            Authorization: process.env.TOP_GG_TOKEN,
          },
          schedule: CronExpression.EVERY_30_SECONDS,
        },
      ],
      log: true,
    }),
  ],
  providers: [AppGateway],
})
export class AppModule {}
