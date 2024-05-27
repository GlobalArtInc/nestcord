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
          url: 'https://top.gg/api/bots/:bot_id/stats',
          bodyData: { server_count: '{{serverCount}}', shard_count: '{{shardCount}}' },
          headerData: {
            Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwMDM1NDc1NzI5NzQzODc1MCIsImJvdCI6dHJ1ZSwiaWF0IjoxNjQzMDkwMjA1fQ.3UJhEbm-OWfM3R95OLNEYXNdBDVj-MSBrGwzTXCzNRc',
          },
          schedule: CronExpression.EVERY_MINUTE,
        },
      ],
      log: true,
    }),
  ],
  providers: [AppGateway],
})
export class AppModule {}
