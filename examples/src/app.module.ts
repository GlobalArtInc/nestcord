import { NestCordLocalizationModule } from '../../packages/localization/nestcord-localization.module';
import { GatewayIntentBits, Partials } from 'discord.js';
import { NestCordModule } from '../../packages/core';
import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { UserResolver } from '../../packages/localization/resolvers';
import { DefaultLocalizationAdapter } from '../../packages/localization/adapters';

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
    NestCordLocalizationModule.forRoot({
      resolvers: UserResolver,
      adapter: new DefaultLocalizationAdapter({
        fallbackLocale: 'en-US',
        locales: {
          'en-US': {
            'commands.ping.name': 'ping',
            'commands.ping.description': 'Pong!'
          },
          'ru': {
            'commands.ping.name': 'пинг',
            'commands.ping.description': 'Понг!'
          }
        }
      }),
    })
  ],
  providers: [AppGateway],
})
export class AppModule {}
