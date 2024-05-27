---
id: stat-reporter

title: Stat Reporter

sidebar_position: 2
---

    `@globalart/nestcord` is a lightweight stat-reporter module for [NestCord](https://nestcord.globalart.dev/). This module sends data from your bot to different monitoring bots services.

## Installation

```bash npm2yarn
npm i @globalart/nestcord discord.js
```

## Usage

Once the installation process is complete, we can import the `NestCordStatReporterModule` with your `NestCordModule` into the root `AppModule`:

```typescript
import { NestCordModule, NestCordStatReporterModule } from '@globalart/nestcord';
import { Module } from '@nestjs/common';
import { NestCordLocalizationModule, DefaultLocalizationAdapter, UserResolver } from '@globalart/nestcord';
import { CronExpression } from '@nestjs/schedule';
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
      NestCordStatReporterModule.forRoot({
        services: [
          {
            name: 'top.gg',
            url: 'https://top.gg/bots/:bot_id/stats',
            bodyData: { server_count: '{{serverCount}}', shards: '{{shardCount}}' },
            schedule: CronExpression.EVERY_5_MINUTES,
          },
        ],
      }),
    ],
    providers: [AppService]
})
export class AppModule {
}
```

Congratulations! You have successfully register cronjob with NestCord!
