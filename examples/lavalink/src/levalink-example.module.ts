import { GatewayIntentBits, Partials } from 'discord.js';
import { NestCordModule } from '../../../packages/core';
import { Module } from '@nestjs/common';
import { LevalinkExampleGateway } from './levalink-example.gateway';
import { NestCordLavalinkModule } from '../../../packages';

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
    NestCordLavalinkModule.forRoot({
      nodes: [
        {
          authorization: 'youshallnotpass',
          host: '192.168.2.157',
          port: 2333,
        },
      ],
    }),
  ],
  providers: [LevalinkExampleGateway],
})
export class LevalinkExampleModule {}
