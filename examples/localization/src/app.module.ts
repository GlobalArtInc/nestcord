import { GatewayIntentBits, Partials } from 'discord.js';
import { NestCordModule } from '../../../packages';
import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { DefaultLocalizationAdapter, GuildResolver, NestCordLocalizationModule, UserResolver } from '../../../packages';

async function getLocales() {
  return {
    'en-US': {
      'commands.ping.name': 'ping',
      'commands.ping.description': 'Pong!\nPlaceholder: **{{placeholder}}**',
      'commands.options.name': 'options',
      'commands.options.desc': 'Options desc',
      'commands.options.first.name': 'First',
    },
    ru: {
      'commands.ping.name': 'пинг',
      'commands.ping.description': 'Понг!\nPlaceholder: **{{placeholder}}**',
      'commands.options.name': 'options',
      'commands.options.desc': 'Options desc',
      'commands.options.first.name': 'First',
    },
  };
}

@Module({
  imports: [
    NestCordModule.forRoot({
      // skipRegistration: true,
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
    NestCordLocalizationModule.forRootAsync({
      useFactory: async () => {
        const locales = await getLocales();

        return {
          resolvers: [UserResolver, GuildResolver],
          adapter: new DefaultLocalizationAdapter({
            fallbackLocale: 'en-US',
            locales,
          }),
        };
      },
    }),
  ],
  providers: [AppGateway],
})
export class AppModule {}
