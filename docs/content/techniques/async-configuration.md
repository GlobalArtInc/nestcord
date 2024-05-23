---
id: async-configuration

title: Async Configuration

sidebar_position: 2
---

When you need to pass module options asynchronously instead of statically, use the `.forRootAsync()` method. As with most dynamic modules, Nest provides several techniques to deal with async configuration.

One technique is to use a factory function:

```typescript title="src/app.module.ts"
import { NestCordModule } from '@globalart/nestcord';
import { Module } from '@nestjs/common';
import { IntentsBitField } from 'discord.js';

@Module({
    imports: [
        NestCordModule.forRootAsync({
            useFactory: () => ({
                token: 'DISCORD_BOT_TOKEN',
                intents: [
                    IntentsBitField.Guilds,
                    IntentsBitField.GuildMessages,
                    IntentsBitField.DirectMessages
                ]
            })
        })
    ]
})
export class AppModule {}
```

Like other [factory providers](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory), our factory function can be async and can inject dependencies through inject.

```typescript title="src/app.module.ts"
import { NestCordModule } from '@globalart/nestcord';
import { Module } from '@nestjs/common';
import { IntentsBitField } from 'discord.js';

@Module({
    imports: [
        NestCordModule.forRootAsync({
            imports: [ConfigModule.forFeature(nestcordModuleConfig)],
            useFactory: async (configService: ConfigService) => ({
                token: configService.get<string>('DISCORD_BOT_TOKEN'),
                intents: [
                    IntentsBitField.Guilds,
                    IntentsBitField.GuildMessages,
                    IntentsBitField.DirectMessages
                ]
            }),
            inject: [ConfigService]
        })
    ]
})
export class AppModule {}
```

Alternatively, you can configure the NestCordModule using a class instead of a factory, as shown below:

```typescript title="src/app.module.ts"
import { NestCordModule } from '@globalart/nestcord';
import { Module } from '@nestjs/common';
import { IntentsBitField } from 'discord.js';

@Module({
    imports: [
        NestCordModule.forRootAsync({
            useClass: NestCordConfigService
        })
    ]
})
export class AppModule {}
```

The construction above instantiates `NestCordConfigService` inside `NestCordModule`, using it to create the required options object. Note that in this example, the `NestCordConfigService` has to implement the `NestCordOptionsFactory` interface, as shown below. The `NestCordModule` will call the `.createNestCordOptions()` method on the instantiated object of the supplied class.

```typescript title="src/discord-config.service.ts"
import { Injectable } from '@nestjs/common';
import { NestCordOptionsFactory, NestCordModuleOptions } from '@globalart/nestcord';
import { IntentsBitField } from 'discord.js';

@Injectable()
class NestCordConfigService {
    createNestCordOptions(): NestCordModuleOptions {
        return {
            token: 'DISCORD_BOT_TOKEN',
            intents: [
                IntentsBitField.Guilds,
                IntentsBitField.GuildMessages,
                IntentsBitField.DirectMessages
            ]
        };
    }
}
```

If you want to reuse an existing options provider instead of creating a private copy inside the `NestCordModule`, use the `useExisting` syntax.
