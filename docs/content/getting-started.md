---
id: start

slug: start

title: Getting Started

description: Are you ready to get started with nestcord? This guide will help you get started with nestcord, and will show you how to create your first bot!

sidebar_position: 2
---

In this article, you'll learn about the basics of nestcord, and how it integrates with [NestJS](https://nestjs.com/)!

:::tip

Many of the concepts seen with nestcord are designed to be used like other components in a [NestJS](https://nestjs.com/) project.  
We recommend you to be familiar with the [NestJS documentation](https://docs.nestjs.com/), especially its [overview](https://docs.nestjs.com/first-steps) section, before getting started.

:::

The very first step is to install nestcord and its dependency, [`Discord.js`](https://discord.js.org)

```bash npm2yarn
npm install @globalart/nestcord discord.js
```

:::tip
You need to install [Node.js](https://nodejs.org/en/) v16.0.0 or newer to use NestCord and Discord.js.
:::

## Module

NestCord is a module like any others, and can be imported as such within your Nest application.

:::note NestJS modules

Not sure what modules are? Catch up by reading about them in [NestJS](https://docs.nestjs.com/modules)!

:::

```typescript title="discord.module.ts"
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { IntentsBitField } from 'discord.js';

@Module({
    imports: [
        NestCordModule.forRoot({
            token: process.env.DISCORD_TOKEN,
            intents: [IntentsBitField.Flags.Guilds],
            development: [process.env.DISCORD_DEVELOPMENT_GUILD_ID]
        })
    ],
    providers: [AppService]
})
export class DiscordModule {}
```

:::info

Make sure to setup the correct **[intents](https://discordjs.guide/popular-topics/intents.html#privileged-intents)** required by your application!

:::

The module arguments are an extension of discord.js [ClientOptions](https://discord.js.org/#/docs/discord.js/stable/typedef/ClientOptions), in addition to 3 nestcord options: `token`, `prefix` and `development`.

```ts
export interface NestCordModuleOptions extends DiscordClientOptions {
    token: string;
    prefix?: string | (message: Message) => string | Promise<string>;
    development?: Snowflake[] | false;
    skipRegistration?: boolean;
}
```

| Property           | Type                                       | Description                                         |
|--------------------|--------------------------------------------|-----------------------------------------------------|
| `token`            | `string`                                   | Your Discord token                                  |
| `prefix`           | `string` or `(message: Message) => string` | The prefix for your bot                             |
| `development`      | `Snowflake[]` or `false`                   | The development guilds for your bot                 |
| `skipRegistration` | `boolean`                                  | Skip automatic registration of application commands |

:::caution Warning

If you have commands using the `guilds` property, the global development argument **will not** overwrite it.

:::


## Slash Commands

The best way to interact with your users is to use [Slash commands](https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ)!
Slash commands allow you to create commands with precise arguments and choices, giving users the best experience.

To create a command with NestCord, you can use the `SlashCommand` decorator.

```typescript title="app.service.ts"
import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from '@globalart/nestcord';

@Injectable()
export class AppService {
    @SlashCommand({
        name: 'ping',
        description: 'Ping command!'
    })
    public async onPing(@Context() [interaction]: SlashCommandContext) {
        return interaction.reply({ content: 'Pong!' });
    }
}
```

:::tip

When the client logs in, it will automatically register all of the commands.
Global commands are cached for up to an hour, therefore to avoid the global commands cache, you should use the `development` argument on the NestCord module. This will restrict the command to a single guild, preventing it from getting caught by the cache.

:::

## Running the application

You can run the following command at your OS command prompt to start the application listening Discord API events:

```bash npm2yarn
$ npm run start
```
