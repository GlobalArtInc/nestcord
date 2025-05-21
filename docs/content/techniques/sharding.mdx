---
id: sharding

title: Sharding

sidebar_position: 1
---

Discord prevents your bot application from logging in without sharding once you hit a scale of 2,500 guilds. If you are not planning to create a public bot application, then you can go ahead and ignore this section. However, if you are creating a public bot application, it would be wise to keep sharding in mind as it can increase the complexity of your application due to how a sharded process works.

:::caution
If you are running the bot as part of a webserver within NestJS, then in order to implement sharding you must understand that initialising `nestcord` within your HTTP server process isn't going to be a viable option. So we're going to have to split the two into their own independent processes. This doesn't mean you can't share code between the two, just that they will be running on different processes. You could consider your "bot" application as a microservice of sorts.
:::

1. In your `src` directory, create a new `bot.ts` file, this will be used to instantiate the bot as a standalone application wth some slight differences. The `DiscordModule` cannot be imported within your `AppModule`. This is because we do not want any bot processes on unsharded processes, so if you need to share code between the two, you should import the necessary modules into your `DiscordModule` or alternatively, create a `SharedModule` which is imported both into your `AppModule` and `DiscordModule`.

```typescript
import { NestFactory } from '@nestjs/core';
import { DiscordModule } from './discord/discord.module';

async function bootstrap() {
    await NestFactory.createApplicationContext(DiscordModule);
}

bootstrap();
```

:::info
You may also need to add a `webpack.config.js` file to your root directory which exports the `bot.ts` file as it's not automatically exported with the application due to how the `bot.ts` file is used within another process which webpack is unable to detect. You can use the following snippet to achieve this:

```js
const Path = require('path');

module.exports = function (options) {
    return {
        ...options,
        entry: {
            main: options.entry,
            bot: Path.join(__dirname, 'src', 'bot.ts')
        },
        output: {
            filename: '[name].js'
        }
    };
};
```

:::

2. Modify your `main.ts` file to create a new `ShardingManager` instance which calls your `bot.js` file (not .ts extension), specifying a .ts extension will cause errors as this is executed only after your code has been transpiled into JavaScript. You can use the snippet below as an example:

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Path from 'path';

export async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = 80;

    await app.listen(port);

    const manager = new ShardingManager(Path.join(__dirname, 'bot.js'), {
        token: 'secret'
    });

    manager.spawn();

    manager.on('shardCreate', shard => {
        shard.on('reconnecting', () => {
            console.log(`Reconnecting shard: [${shard.id}]`);
        });

        shard.on('spawn', () => {
            console.log(`Spawned shard: [${shard.id}]`);
        });

        shard.on('ready', () => {
            console.log(` Shard [${shard.id}] is ready`);
        });

        shard.on('death', () => {
            console.log(`Died shard: [${shard.id}]`);
        });

        shard.on('error', err => {
            console.log(`Error in  [${shard.id}] with : ${err} `);
            shard.respawn();
        });
    });
}
bootstrap();
```

3. Now when you bootstrap your application, your `bot.ts` context is created on a sharded process.

:::tip
If you are running into further issues and require cross-hosting your bot application, then just swap the `ShardingManager` out for other sharding packages like the [discord-hybrid-sharding](https://github.com/meister03/discord-hybrid-sharding) which is required for the [discord-cross-hosting](https://github.com/meister03/discord-cross-hosting) package.
:::
