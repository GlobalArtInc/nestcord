---
id: localization

title: Localization

sidebar_position: 2
---

Is a lightweight localization module for [NestCord](https://nestcord.globalart.dev/). It allows you to easily localize your bot's
commands and messages. The module provides a simple API for managing locales and translations, as well as a powerful localization adapter
system.

## Usage

Once the installation process is complete, we can import the `NestCordLocalizationModule` with your `NestCordModule` into the root `AppModule`:

```typescript
import { NestCordModule } from '@globalart/nestcord';
import { Module } from '@nestjs/common';
import { NestCordLocalizationModule, DefaultLocalizationAdapter, UserResolver } from '@globalart/nestcord';
import { AppService } from './app.service';

@Module({
    imports: [
        NestCordModule.forRoot({
            token: process.env.DISCORD_TOKEN,
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.DirectMessages,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.MessageContent
            ],
            prefix: '!',
            development: [process.env.DISCORD_TEST_GUILD]
        }),
        NestCordLocalizationModule.forRoot({
            resolvers: UserResolver,
            // Also you can provide class for support injection by @Inject
            adapter: new DefaultLocalizationAdapter({
                fallbackLocale: 'en-US',
                locales: {
                    'en-US': {
                        'commands.ping.name': 'ping',
                        'commands.ping.description': 'Pong!'
                    },
                    ru: {
                        'commands.ping.name': 'пинг',
                        'commands.ping.description': 'Понг!'
                    }
                }
            })
        })
    ],
    providers: [AppService]
})
export class AppModule {
}
```

## Adapters

The `DefaultLocalizationAdapter` is a simple adapter that allows you to provide a map of locales and translations.

Also you can use the `NestedLocalizationAdapter` that allows you to organize translation keys into objects

```typescript
import { NestCordLocalizationModule, NestedLocalizationAdapter, UserResolver } from '@globalart/nestcord/localization';

NestCordLocalizationModule.forRoot({
    resolvers: UserResolver,
    adapter: new NestedLocalizationAdapter({
        fallbackLocale: 'en-US',
        locales: {
            'en-US': {
                'commands': {
                    'ping': {
                        'name': 'ping',
                        'description': 'Pong!'
                    }
                }
            },
            ru: {
                'commands': {
                    'ping': {
                        'name': 'пинг',
                        'description': 'Понг!'
                    }
                }
            }
        }
    })
})

```

:::info
`DefaultLocalizationAdapter` and `NestedLocalizationAdapter` can translate your localization strings and placeholders (e.g `{{username}}`)
:::

#### Custom Adapters

Also, you can create your own localization adapter. Just implement the `BaseLocalizationAdapter` interface:

```typescript
import { BaseLocalizationAdapter } from '@globalart/nestcord/localization';

interface CustomLocalizationOptions {
    fallbackLocale: string;
    locales: Record<string, Record<string, string>>;
}

export class CustomLocalizationAdapter extends BaseLocalizationAdapter<CustomLocalizationOptions> {
    public getTranslation(key: string, locale: string, ...args: any[]): string {
        return `${key} by ${locale}`;
    }
}
```

## Resolvers

Resolvers are used to get the locale for translation. By default, NestCord provides two resolvers: `UserResolver` and `GuildResolver`.

| Resolver      | Description                                                                  |
|---------------|------------------------------------------------------------------------------|
| UserResolver  | Gets the locale from the user's locale property (`interaction.locale`)       |
| GuildResolver | Gets the locale from the guild's locale property (`interaction.guildLocale`) |

#### Custom Resolvers

Also, you can create your own Resolver. Just implement the `LocaleResolver` interface:

```typescript
import { CommandContext, LocaleResolver } from '@globalart/nestcord';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { NestCordExecutionContext } from '@globalart/nestcord';

@Injectable()
export class GuildResolver implements LocaleResolver {
    resolve(context: ExecutionContext): string | string[] | undefined {
        const nestcordContext = NestCordExecutionContext.create(context);
        const [interaction] = nestcordContext.getContext<CommandContext>();

        return interaction.guildLocale;
    }
}
```

## Localization 

We can inject the `LOCALIZATION_ADAPTER` into our service and use it to localize our commands and messages:

```typescript title="src/app.gateway.ts"
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { DefaultLocalizationAdapter, localizationMapByKey, LOCALIZATION_ADAPTER } from '@globalart/nestcord';
import { Context, SlashCommand, SlashCommandContext } from '@globalart/nestcord';

@Injectable()
export class AppService implements OnModuleInit {
    public constructor(
        @Inject(LOCALIZATION_ADAPTER)
        private readonly localizationAdapter: DefaultLocalizationAdapter
    ) {
    }

    @SlashCommand({
        name: 'ping',
        description: 'Pong!',
        nameLocalizations: localizationMapByKey('commands.ping.name'),
        descriptionLocalizations: localizationMapByKey('commands.ping.name')
    })
    public ping(@Context() [interaction]: SlashCommandContext) {
        const message = this.localizationAdapter.getTranslation(
            'commands.ping.description',
            interaction.locale
        );
        return interaction.reply(message);
    }
}
```

Or you can use `translate` function from the localization adapter:

```typescript title="src/app.gateway.ts"
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { DefaultLocalizationAdapter, localizationMapByKey, LOCALIZATION_ADAPTER } from '@globalart/nestcord';
import { Context, SlashCommand, SlashCommandContext } from '@globalart/nestcord';

@Injectable()
export class AppService implements OnModuleInit {
    public constructor(
        @Inject(LOCALIZATION_ADAPTER)
        private readonly localizationAdapter: DefaultLocalizationAdapter
    ) {
    }

    @SlashCommand({
        name: 'ping',
        description: 'Pong!',
        nameLocalizations: localizationMapByKey('commands.ping.name'),
        descriptionLocalizations: localizationMapByKey('commands.ping.name')
    })
    public ping(@Context() [interaction]: SlashCommandContext) {
        const message = this.localizationAdapter.translate(
            'commands.ping.description',
        );
        return interaction.reply(message);
    }
}
```

Or you can use `@CurrentTranslate` decorator to get the current translation from context:

```typescript
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { DefaultLocalizationAdapter, CurrentTranslate, localizationMapByKey, TranslationFn } from '@globalart/nestcord/localization';
import { Context, SlashCommand, SlashCommandContext } from '@globalart/nestcord';

@Injectable()
export class AppService implements OnModuleInit {
    @SlashCommand({
        name: 'ping',
        description: 'Pong!',
        nameLocalizations: localizationMapByKey('commands.ping.name'),
        descriptionLocalizations: localizationMapByKey('commands.ping.name')
    })
    public ping(
        @Context() [interaction]: SlashCommandContext,
        @CurrentTranslate() t: TranslationFn
    ) {
        const message = t('commands.ping.description');
        return interaction.reply(message);
    }
}
```

:::info
Function `localizationMapByKey` are used to localize the command name and description. You pass the translation key or localization map as
an argument to the function.
:::

#### Setting up localized commands
You can set what locales the command will be localized

```typescript
@SlashCommand({
    name: 'ping',
    description: 'Pong!',
    nameLocalizations: localizationMapByKey('commands.ping.name', ['en', 'ru']),
    descriptionLocalizations: localizationMapByKey('commands.ping.name', ['en', 'ru'])
})
```

Or just pass a localization object with the location id and translation key to the `nameLocalization` and `descriptionLocalizations`
properties

```typescript
@SlashCommand({
    name: 'ping',
    description: 'Pong!',
    nameLocalizations: {
        en: 'command.ping.name',
        ru: 'command.ping.name'
    },
    descriptionLocalizations: {
        en: 'command.ping.description',
        ru: 'command.ping.description'
    }
})
```

Congratulations! You have successfully created your first localized command with NestCord!
