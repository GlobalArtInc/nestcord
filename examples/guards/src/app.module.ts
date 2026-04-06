import { Module } from '@nestjs/common';
import { GatewayIntentBits } from 'discord.js';
import { NestCordCooldownModule, NestCordModule } from '../../../packages/core';
import { GuardsGateway } from './guards.gateway';

@Module({
  imports: [
    NestCordModule.forRoot({
      token: process.env.DISCORD_TOKEN,
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
      ],
    }),

    // --- Option 1: In-memory (default, zero config) ---
    NestCordCooldownModule.forRoot({
      storage: {
        type: 'file',
        path: './test.json',
      },
    }),

    // --- Option 2: File-based (survives restarts, single-process) ---
    // NestCordCooldownModule.forRoot({
    // 	storage: { type: 'file', path: './cooldowns.json' },
    // }),

    // --- Option 3: Redis (survives restarts, works across all shards) ---
    // Requires: pnpm add ioredis
    // NestCordCooldownModule.forRoot({
    // 	storage: { type: 'redis', options: { url: process.env.REDIS_URL } },
    // }),

    // --- Option 3b: Redis via forRootAsync (with DI, e.g. ConfigService) ---
    // NestCordCooldownModule.forRootAsync({
    // 	imports: [ConfigModule],
    // 	inject: [ConfigService],
    // 	useFactory: (config: ConfigService) => ({
    // 		storage: { type: 'redis', options: { url: config.get('REDIS_URL') } },
    // 	}),
    // }),
  ],
  providers: [GuardsGateway],
})
export class AppModule {}
