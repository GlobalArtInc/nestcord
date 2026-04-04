import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';
import { NestCordModule } from '../../../packages/core';
import { ShardGateway } from './shard.gateway';

@Module({
  imports: [
    NestCordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      intents: [
        // GatewayIntentBits.Guilds,
        // GatewayIntentBits.GuildMessages,
        // GatewayIntentBits.MessageContent,
      ],
    }),
  ],
  providers: [ShardGateway],
})
export class ShardModule {}
