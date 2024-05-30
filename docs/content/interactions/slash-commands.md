---
id: slash-commands

title: Slash Commands

sidebar_position: 1
---

**Slash Commands** are the new, exciting way to build and interact with bots on **Discord**. With Slash Commands, all you have to do is
type `/` and you're ready to use your favorite bot. You can easily see all the commands a bot has, and validation and error handling help
you get the command right the first time.

![Slash Commands](/img/content/slash_command_menu.png 'Slash Commands')

## Global Commands

:::tip

Global commands are cached for one hour. New global commands will fan out slowly across all guilds and will only be guaranteed to be updated
after an hour. Guild commands update instantly. As such, we recommend you use guild-based commands during development and publish them to
global commands when they're ready for public use.

[Read more about dev-mode configuration](/start#development)
:::

Create `app.commands.ts` file and add method with `SlashCommand` decorator.

```typescript title="src/app.commands.ts"
import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from '@globalart/nestcord';

@Injectable()
export class AppCommands {
    @SlashCommand({
        name: 'ping',
        description: 'Ping-Pong Command'
    })
    public async onPing(@Context() [interaction]: SlashCommandContext) {
        return interaction.reply({ content: 'Pong!' });
    }
}
```

## Guild Commands

If you want to have guild specific commands, use the `guilds` property on the `SlashCommand` decorator

```typescript title="src/app.commands.ts"
import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from '@globalart/nestcord';

@Injectable()
export class AppCommands {
    @SlashCommand({
        name: 'ping',
        description: 'Ping-Pong Command',
        guilds: [process.env.DEV_GUILD]
    })
    public async onPing(@Context() [interaction]: SlashCommandContext) {
        return interaction.reply({ content: 'Pong!' });
    }
}
```

> You can use decorator on both method and class.

## Options

Use the option decorator to define a parameter in a slash command, let's create the `LengthDto` class:

```typescript title="length.dto.ts"
import { StringOption } from '@globalart/nestcord';

export class TextDto {
    @StringOption({
        name: 'text',
        description: 'Your text',
        required: true
    })
    text: string;
}
```

It has only one basic properties. Thereafter we can use the newly created DTO inside the `AppCommands`:

```typescript title="app.commands.ts"
import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, Options, SlashCommandContext } from '@globalart/nestcord';
import { TextDto } from './length.dto';

@Injectable()
export class AppCommands {
    @SlashCommand({
        name: 'length',
        description: 'Get length of text'
    })
    public async onLength(@Context() [interaction]: SlashCommandContext, @Options() { text }: TextDto) {
        return interaction.reply({content: `Length of your text ${text.length}`});
    }
}
```


List of all built-in option decorators:

| Decorator           | Type                          | Description          |
| :------------------ | :---------------------------- | :------------------- |
| `StringOption`      | `string`                      | A string option      |
| `NumberOption`      | `number`                      | A number option      |
| `IntegerOption`     | `number`                      | An integer option    |
| `BooleanOption`     | `boolean`                     | A boolean option     |
| `UserOption`        | `User`                        | A user option        |
| `MemberOption`      | `GuildMember`                 | A member option      |
| `ChannelOption`     | `GuildChannel`                | A channel option     |
| `RoleOption`        | `Role`                        | A role option        |
| `MentionableOption` | `GuildMember` \| `Role` \| `User` | A mentionable option |
| `AttachmentOption`  | `AttachmentOption`            | An attachment option |

## Autocomplete

To add autocomplete to your Slashcommand you will need a interceptor first. This class will intercept all requests from the user after typing in the autocomplete option field

```typescript title="anime.interceptor.ts"
import { Injectable } from '@nestjs/common';
import { AutocompleteInteraction } from 'discord.js';
import { AutocompleteInterceptor } from '@globalart/nestcord';

@Injectable()
class AnimeAutocompleteInterceptor extends AutocompleteInterceptor {
    public transformOptions(interaction: AutocompleteInteraction) {
        const focused = interaction.options.getFocused(true);
        let choices: string[];

        if (focused.name === 'anime') {
            choices = ['Hunter x Hunter', 'Naruto', 'One Piece'];
        }

        return interaction.respond(
            choices
                .filter(choice => choice.startsWith(focused.value.toString()))
                .map(choice => ({ name: choice, value: choice }))
        );
    }
}
```

You'll then have to add `autocomplete: true` to your options class:

```typescript title="anime.dto.ts"
import { StringOption } from '@globalart/nestcord';

export class AnimeDto {
    @StringOption({
        name: 'anime',
        description: 'The anime to look up',
        autocomplete: true,
        required: true
    })
    anime: string;
}
```

And last but not least, apply the interceptor to your slash command

```typescript title="anime-commands.service.ts"
import { Injectable, UseInterceptors } from '@nestjs/common';
import { Context, SlashCommand, Options, SlashCommandContext } from '@globalart/nestcord';
import { AnimeDto } from '/anime.dto';
import { AnimeAutocompleteInterceptor } from './anime.interceptor';

@Injectable()
export class AnimeCommands {
    @UseInterceptors(AnimeAutocompleteInterceptor)
    @SlashCommand({
        name: 'anime',
        description: 'Lookup information about an anime'
    })
    public async onSearch(@Context() [interaction]: SlashCommandContext, @Options() { anime }: AnimeDto) {
        return interaction.reply({content: `I found the anime ${anime}`});
    }
}
```

## Groups

:::tip **TIP**

For those developers looking to make more organized and complex groups of commands, look no further than subgroups and groups.
:::

Use `SlashGroup` decorators on class-level `(Group)` and method-level `(SubGroup)`:

```typescript title="utils-commands.service.ts"
import {createCommandGroupDecorator, Subcommand} from '@globalart/nestcord';

export const UtilsCommandDecorator = createCommandGroupDecorator({
    name: 'utils',
    description: 'Utils group',
});

@UtilsCommandDecorator()
export class UtilsCommands {
    @Subcommand({
        name: 'ping',
        description: 'Ping-pong command'
    })
    public async onPing(...) {
    ...
    }
}

@UtilsCommandDecorator({
    name: 'string',
    descriptionn: 'String utility commands'
})
export class UtilsStringCommands {
    @Subcommand({
        name: 'length',
        description: 'String length command'
    })
    public async onLength(...) {
    ...
    }
}


```

After the registration commands, the bot will process `/utils ping` and `/utils string length` commands, like here:

![Commands](/img/content/slash_command_example.png)
