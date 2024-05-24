import { GatewayIntentBits, Partials } from 'discord.js';
import { NestCordModule } from '../../../packages/core';
import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { DefaultLocalizationAdapter, GuildResolver, NestCordLocalizationModule, NestCordPaginationModule, UserResolver } from '../../../packages';

async function getLocales() {
	return {
		'en-US': {
			'commands.ping.name': 'ping',
			'commands.ping.description': 'Pong!'
		},
		ru: {
			'commands.ping.name': 'пинг',
			'commands.ping.description': 'Понг!'
		}
	};
}

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
    NestCordPaginationModule.forRoot({
      buttons: {},
      allowSkip: true,
      allowTraversal: true
    }),
  ],
  providers: [AppGateway],
})
export class AppModule {}
