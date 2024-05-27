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
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],
      partials: [Partials.Message, Partials.Channel, Partials.Reaction],
    }),
    NestCordStatReporterModule.forRoot({
      services: [
        {
          name: 'top.gg',
          url: 'https://top.gg/bots/:bot_id/stats',
          bodyData: { server_count: '{{serverCount}}', shards: '{{shardCount}}' },
          headerData: {
            Authorization: process.env.TOP_GG_TOKEN,
          },
          schedule: CronExpression.EVERY_10_SECONDS,
        },
      ],
    }),
  ],
  providers: [AppGateway],
})
export class AppModule {}
