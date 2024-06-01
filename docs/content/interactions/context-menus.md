---
id: context-menus

title: Context Menus

sidebar_position: 2
---

**User commands** and **message commands** are now live! These commands appear on context menus for users and messages, with more to come in the future.

## User Commands

**User commands** are application commands that appear on the context menu (right click or tap) of users. They're a great way to surface quick actions for your app that target users.

```typescript title="src/app.commands.ts"
import { Injectable } from '@nestjs/common';
import { Context, UserCommand, UserCommandContext, TargetUser } from '@globalart/nestcord';
import { User } from 'discord.js';

@Injectable()
export class AppCommands {
    @UserCommand({ name: 'Get avatar' })
    public async getUserAvatar(
        @Context() [interaction]: UserCommandContext,
        @TargetUser() user: User
    ) {
        return interaction.reply({
            embeds: [
                new MessageEmbed()
                    .setTitle(`Avatar ${user.username}`)
                    .setImage(user.displayAvatarURL({ size: 4096, dynamic: true }))
            ]
        });
    }
}
```

If all goes well, you should see something like this:

![User Command](/img/content/context_user.png 'User Command')

## Message Commands

**Message commands** are application commands that appear on the context menu (right click or tap) of messages. They're a great way to surface quick actions for your app that target messages.

```typescript title="src/app.commands.ts"
import { Injectable } from '@nestjs/common';
import { Context, MessageCommand, MessageCommandContext, TargetMessage } from '@globalart/nestcord';
import { Message } from 'discord.js';

@Injectable()
export class AppCommands {
    @MessageCommand({ name: 'Copy Message' })
    public async copyMessage(
        @Context() [interaction]: MessageCommandContext,
        @TargetMessage() message: Message
    ) {
        return interaction.reply({ content: message.content });
    }
}
```

If all goes well, you should see something like this:

![Message Command](/img/content/context_message.png 'Message Command')
