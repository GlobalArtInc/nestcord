<div align="center">
   <h1>
       <a href="#"><img src="https://nestcord.globalart.dev/img/logo.png" alt ="NestCord Logo"></a>
   </h1>
   🤖 A module for creating <b><a href="https://discord.com/">Discord</a> bots</b> using <a href="https://nestjs.com">NestJS</a>, based on <a href="https://discord.js.org/">Discord.js</a>
   <br/><br/>
   <a href="https://nestcord.globalart.dev">Documentation ✨</a> &emsp; <a href="https://github.com/GlobalArtInc/nestcord">Source code 🪡</a> &emsp; <a href="https://github.com/GlobalArtInc/nestcord/tree/master/examples">Examples 🛠️</a> &emsp; <a href="https://discord.gg/BBFhU8g">Community 💬</a>
</div>

<br/>

<p align="center">
  <a href='https://img.shields.io/npm/v/@globalart/nestcord'><img src="https://img.shields.io/npm/v/@globalart/nestcord" alt="NPM Version" /></a>
  <a href='https://img.shields.io/npm/l/@globalart/nestcord'><img src="https://img.shields.io/npm/l/@globalart/nestcord" alt="NPM License" /></a>
  <a href='https://img.shields.io/npm/dm/@globalart/nestcord'><img src="https://img.shields.io/npm/dm/@globalart/nestcord" alt="NPM Downloads" /></a>
</p>

## About

This package uses the best of the NodeJS world under the hood. [Discord.js](https://github.com/discordjs/discord.js) is the most powerful
library for creating bots and [Nest.js](https://github.com/nestjs) is a progressive framework for creating well-architectured applications.
This module provides fast and easy way for creating Discord bots and deep integration with your NestJS application.

## Usage

Once the installation process is complete, we can import the `NestCordModule` into the root `AppModule`:

```typescript
import { NestCordModule } from '@globalart/nestcord';
import { Module } from '@nestjs/common';
import { GatewayIntentBits, Partials } from 'discord.js';
import { AppGateway } from './app.update';

@Module({
    imports: [
        NestCordModule.forRoot({
            token: 'DISCORD_BOT_TOKEN',
            intents: [
              GatewayIntentBits.Guilds, 
              GatewayIntentBits.GuildMessages, 
              GatewayIntentBits.DirectMessages
            ]
        })
    ],
    providers: [AppGateway]
})
export class AppModule {
}
```

Then create `app.update.ts` file and add `On`/`Once` decorators for handling Discord API events:

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { Context, On, Once, ContextOf } from '@globalart/nestcord';
import { Client } from 'discord.js';

@Injectable()
export class AppGateway {
    private readonly logger = new Logger(AppGateway.name);

    public constructor(private readonly client: Client) {
    }
    
    @Once('ready')
    public onReady(@Context() [client]: ContextOf<'ready'>) {
        this.logger.log(`Bot logged in as ${client.user.username}`);
    }

    @On('warn')
    public onWarn(@Context() [message]: ContextOf<'warn'>) {
        this.logger.warn(message);
    }
}
```