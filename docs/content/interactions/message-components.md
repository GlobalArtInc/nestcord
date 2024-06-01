---
id: message-components

title: Message Components

sidebar_position: 3
---

**Message components** — we'll call them "components" moving forward—are a framework for adding interactive elements to the messages your app or bot sends. They're accessible, customizable, and easy to use.

There are several different types of components; this documentation will outline the basics of this new framework and each example.

## Button

**Buttons** are interactive components that render on messages. They can be clicked by users, and send an [interaction](https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object) to your app when clicked.

<img src="/img/content/button.png" alt="Buttons" width="500" />

```typescript title="src/app.components.ts"
import { Injectable } from '@nestjs/common';
import { Context, Button, ButtonContext } from '@globalart/nestcord';

@Injectable()
export class AppComponents {
    @Button('BUTTON')
    public onButton(@Context() [interaction]: ButtonContext) {
        return interaction.reply({ content: 'Button clicked!' });
    }
}
```

### Dynamic Button
You can create buttons with dynamic `id` field. This is useful for passing metadata to buttons.

Dynamic buttons uses [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) format to perform regexp matching. Turn a path string such as `user/:name` into a regular expression.

To create a Dynamic button
```typescript
new ButtonBuilder()
  .setCustomId('click/12345')
  .setLabel('LABEL')
  .setStyle(ButtonStyle.Primary)
```

To receive a Dynamic button
```typescript
import { Injectable } from '@nestjs/common';
import { Context, Button, ButtonContext } from '@globalart/nestcord';

@Injectable()
export class AppComponents {
  @Button('click/:value')
  public onButton(
    @Context() [interaction]: ButtonContext,
    @ComponentParam('value') value: string
  ) {
    return interaction.reply({ content: `Button clicked! Value: ${value}` });
  }
}

```

## Select Menu

**Select menus** are another interactive component that renders on messages. On desktop, clicking on a select menu opens a dropdown-style UI; on mobile, tapping a select menu opens up a half-sheet with the options.

<img src="/img/content/select-menu.png" alt="Select Menu" width="500" />

Discord has introduced new select menu components :
- `String Select`
- `User Select`
- `Role Select`
- `Mentionable Select`
- `Channel Select`

### String Select
**String Select** is Select Menu for picking defined text options

To create String Select:
```typescript
new StringSelectMenuBuilder()
  .setCustomId('STRING_SELECT_MENU') // replace with your customId
  .setPlaceholder('Select your color')
  .setMaxValues(1)
  .setMinValues(1)
  .setOptions([
    { label: 'Red', value: 'Red' },
    { label: 'Blue', value: 'Blue' },
    { label: 'Yellow', value: 'Yellow' }
  ])
```

To receive a String Select:
```typescript
import { Injectable } from '@nestjs/common';
import { Context, StringSelect, StringSelectContext, SelectedStrings } from '@globalart/nestcord';

@Injectable()
export class AppComponents {
    @StringSelect('STRING_SELECT_MENU')
    public onStringSelect(
      @Context() [interaction]: StringSelectContext,
      @SelectedStrings() selected: string[]
    ) {
      return interaction.reply({
        content: `Your selected color - ${selected.join(' ')}`
      });
    }
}
```

### User Select
**User Select** are Select Menu for selecting users

To create User Select:
```typescript
new UserSelectMenuBuilder()
  .setCustomId('USER_SELECT_MENU')
  .setPlaceholder('Select a user')
  .setMaxValues(1)
  .setMinValues(1)
```

To receive a User Select:
```typescript
import { Injectable } from '@nestjs/common';
import { 
  Context,
  UserSelect,
  UserSelectContext,
  SelectedUser,
  ISelectedUser,
  SelectedMembers,
  ISelectedMembers
} from '@globalart/nestcord';

@Injectable()
export class AppComponents {
    @UserSelect('USER_SELECT_MENU')
    public onUserSelect(
      @Context() [interaction]: UserSelectContext,
      @SelectedUsers() users: ISelectedUsers, // Collection of users
      @SelectedMembers() members: ISelectedMembers // Collection of members
    ) {
      interaction.reply({
        content: `
        Selected users - ${users.map(user => user.username).join(',')}\n
        Selected members - ${members.map(member => member.user?.username).join(',')}
        `
      });
    }
}
```

### Role Select
**Role Select** are Select Menu for selecting roles

To create Role Select:
```typescript
new RoleSelectMenuBuilder()
  .setCustomId('ROLE_SELECT_MENU')
  .setPlaceholder('Select a role')
  .setMaxValues(1)
  .setMinValues(1)
```

To receive a Role Select:
```typescript
import { Injectable } from '@nestjs/common';
import { 
  Context,
  RoleSelect,
  RoleSelectContext,
  SelectedRole,
  ISelectedRole,
} from '@globalart/nestcord';

@Injectable()
export class AppComponents {
    @RoleSelect('ROLE_SELECT_MENU')
    public onRoleSelect(
      @Context() [interaction]: RoleSelectContext,
      @SelectedRoles() roles: ISelectedRoles, // Collection of roles
    ) {
      interaction.reply({
        content: `
        Selected roles - ${roles.map(role => role.id).join(',')}
        `
      });
    }
}
```

### Channel Select
**Channel Select** are Select Menu for selecting channels

To create Channel Select:
```typescript
new ChannelSelectMenuBuilder()
  .setCustomId('CHANNEL_SELECT_MENU')
  .setPlaceholder('Select a channel')
  .setMaxValues(1)
  .setMinValues(1)
```

To receive a Channel Select:
```typescript
import { Injectable } from '@nestjs/common';
import { 
  Context,
  ChannelSelect,
  ChannelSelectContext,
  SelectedChannel,
  ISelectedChannel,
} from '@globalart/nestcord';

@Injectable()
export class AppComponents {
    @ChannelSelect('CHANNEL_SELECT_MENU')
    public onChannelSelect(
      @Context() [interaction]: ChannelSelectContext,
      @SelectedChannels() channels: ISelectedChannels, // Collection of channels
    ) {
      interaction.reply({
        content: `
        Selected channels - ${channels.map(channel => channel.id).join(',')}
        `
      });
    }
}
```

### Mentionable Select
**Mentionable Select** are Select Menu for selecting mentionables (users and roles)

To create Mentionable Select:
```typescript
new MentionableSelectMenuBuilder()
  .setCustomId('MENTIONABLE_SELECT_MENU')
  .setPlaceholder('Select a user/role')
  .setMaxValues(1)
  .setMinValues(1)
```

To receive a Mentionable Select:
```typescript
import { Injectable } from '@nestjs/common';
import { 
  Context,
  MentionableSelect,
  MentionableSelectContext,
  SelectedUsers,
  ISelectedUsers,
  SelectedMembers,
  ISelectedMembers,
  SelectedRoles,
  ISelectedRoles,
} from '@globalart/nestcord';

@Injectable()
export class AppComponents {
    @MentionableSelect('MENTIONABLE_SELECT_MENU')
    public onMentionableSelect(
      @Context() [interaction]: MentionableSelectContext,
      @SelectedUsers() users: ISelectedUsers,
      @SelectedMembers() members: ISelectedMembers,
      @SelectedRoles() roles: ISelectedRoles
    ) {
      return interaction.reply({
        content: `
        Selected users - ${users.map(user => user.username).join(',')}\n
        Selected members - ${members.map(member => member.user?.username).join(',')}\n
        Selected roles - ${roles.map(role => role.name).join(',')}
        `
      });
    }
}
```

### Dynamic Select Menu
All of the Select Menu types, support Dynamic `id` using [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) format.

To create a Dynamic select menu
```typescript
new StringSelectMenuBuilder()
  .setCustomId('preferences/color')
  .setPlaceholder('Select a color')
  .setMaxValues(1)
  .setMinValues(1)
  .setOptions([
    { label: 'Red', value: 'Red' },
    { label: 'Blue', value: 'Blue' },
    { label: 'Yellow', value: 'Yellow' }
  ])
```

To receive a Dynamic select menu
```typescript
import { Injectable } from '@nestjs/common';
import { Context, StringSelect, StringSelectContext,SelectedStrings } from '@globalart/nestcord';

@Injectable()
export class AppComponents {
    @StringSelect('preferences/:item')
	public onPreferenceSelect(
		@Context() [interaction]: StringSelectContext,
		@SelectedStrings() values: string[],
		@ComponentParam('item') item: string
	) {
		return interaction.reply({
			content: `
      ${item} = ${values.join(',')}\n
      `
		});
	}
}

```
Dynamic select menus are compatible with :
- `StringSelect`
- `UserSelect`
- `RoleSelect`
- `MentionableSelect`
- `ChannelSelect`
