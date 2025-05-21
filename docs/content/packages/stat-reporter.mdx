---
id: stat-reporter

title: Stat Reporter

sidebar_position: 2
---

Is a lightweight stat reporter module for NestCord. This module sends data from your bot to different monitoring bot services.

## Usage

Once the installation process is complete, we can import the `NestCordStatReporterModule` with your `NestCordModule` into the root `AppModule`:
```typescript
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { NestCordModule, 
         NestCordStatReporterModule, 
         StatCronExpression, 
         NestCordLocalizationModule, 
         DefaultLocalizationAdapter, 
         UserResolver 
} from '@globalart/nestcord';

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
            actions: [
              {
                name: 'name of the action',
                url: 'https://top.gg/bots/:bot_id/stats',
                bodyData: { server_count: '{{serverCount}}', shard_count: '{{shardCount}}' },
              }
            ],
            headerData: { Authorization: process.env.TOP_GG_TOKEN },
            schedule: StatCronExpression.EVERY_5_MINUTES // or you can use crontab expression like */1 * * * * ,
          },
        ],
      }),
    ],
    providers: [AppService]
})
export class AppModule {
}
```
In `services`, all the services on which the bot is monitored should be listed, and the request body should be passed. `{{serverCount}}` and `{{shardCount}}` will be automatically replaced.

### Global Options
NestCordStatReporterModule interface:
| Property                        | Type                                       | Description                                                                                           |
|---------------------------------|--------------------------------------------|-------------------------------------------------------------------------------------------------------|
| `services`                      | `ServiceOption[]`                          | Services                                                                                              |
| `proxy`                         | `AxiosProxyConfig` or `undefined`          | Proxy config                                                                                          |
| `development`                   | `boolean`                                  | If true, module will disable                                                                          |
| `log`                           | `boolean`                                  | Send log when sended the stats                                                                        |

ServiceOption interface:
| Property                        | Type                                       | Description                                                                                           |
|---------------------------------|--------------------------------------------|-------------------------------------------------------------------------------------------------------|
| `name`                          | `string`                                   | Service Name                                                                                          |
| `url`                           | `string`                                   | API URL for posting the stats                                                                         |
| `proxy`                         | `AxiosProxyConfig` or `undefined`          | Proxy config                                                                                          |
| `bodyData`                      | `object`                                   | Body Data                                                                                             |
| `headerData`                    | `object`                                   | Header Data                                                                                           |
| `schedule`                      | `StatCronExpression` or `string`           | Crontab Expression                                                                                    |

Congratulations! You have successfully register cronjob with NestCord!
