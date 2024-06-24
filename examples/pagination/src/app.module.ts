import { GatewayIntentBits, Partials } from 'discord.js';
import { NestCordModule } from '../../../packages/core';
import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { NestCordPaginationModule } from '../../../packages';

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
    NestCordPaginationModule.forRoot(),
  ],
  providers: [AppGateway],
})
export class AppModule {}
