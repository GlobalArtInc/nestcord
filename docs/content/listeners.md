---
id: listeners

slug: listeners

title: Listeners

description: Listeners are used to listen to events emitted by Discord. They are used to listen to events like `messageCreate`, `interactionCreate`, `guildMemberAdd`, etc.

sidebar_position: 3
---

NestCord supports interacting with all [discord events](https://discord.js.org/#/docs/main/stable/class/Client#Events) via the `@On`
and `@Once` decorator.  
While the best practice is to use the more specific decorators when possible, this is useful if you wish to use features NestCord doesn't
support via custom decorators, to interact with the raw requests, or to listen to all events using a decorator such as `interactionCreate`.

```typescript title="src/app.service.ts"
import {Injectable, Logger} from '@nestjs/common';
import {Once, On, Context, ContextOf} from '@globalart/nestcord';

@Injectable()
export class AppService {
    private readonly logger = new Logger(AppService.name);

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

:::caution Warning

If you use global filters, guards or interceptors, they will be triggered once per event!  
This means if you are replying to the message in guards, you can run into issues with duplicated responses or invalid interactions.
Have a look at the `NestCordExecutionContext.getInfo()` metadata to learn more about the current context.

:::

## Context

You might have noticed the `@Context` decorator in the last snippet: This is used to inject the event context within the method.
As there are many type of events, its type must be inferred from the `ContextOf<type: string>` type.

You can access the context variables by using the `@Context()` decorator within your function, which will populate the variable with an
array of arguments.

```typescript title="src/app.service.ts"
@On('messageCreate')
public onMessageCreate(@Context() [message]: ContextOf<'messageCreate'>) {
    console.log(message.content);
}
```

## Custom Events

NestCord out of the box supports all the events provided by discord.js. You can also create custom events using the `@CustomListenerHandler` and `@CustomListener` decorators.

```typescript title="src/app.service.ts"
import { Injectable } from '@nestjs/common';
import { CustomListener, CustomListenerHandler, BaseHandler, ContextOf } from '@globalart/nestcord';
import { User, UserFlagsBitField } from 'discord.js';

export type CustomUserUpdateEvents = {
	userAvatarUpdate: [user: User, oldAvatar: string, newAvatar: string];
};

export type ContextOfCustomUserUpdate<K extends keyof E, E = CustomUserUpdateEvents> = E[K];


@Injectable()
@CustomListener('userUpdate')
export class UserUpdateHandler extends BaseHandler<CustomUserUpdateEvents> {
	@CustomListenerHandler()
	public handleUserAvatarUpdate([oldUser, newUser]: ContextOf<'userUpdate'>) {
		if (oldUser.partial) return;

		if (oldUser.displayAvatarURL() !== newUser.displayAvatarURL()) {
			this.emit(
				'userAvatarUpdate',
				newUser,
				oldUser.displayAvatarURL(),
				newUser.displayAvatarURL()
			);
		}
	}
}
```

And then you can listen to the custom event using the `@On` decorator.

```typescript title="src/app.service.ts"
@On('userAvatarUpdate')
public onUserAvatarUpdate(
    @Context() [user, oldAvatar, newAvatar]: ContextOfCustomUserUpdate<'userAvatarUpdate'>
) {
    console.log(
        `User ${user.tag} changed their avatar from ${oldAvatar} to ${newAvatar}`
    );
}
```


Also supports custom events.

### Channel Events

| Event Name                      | Description                                                               |
|---------------------------------|---------------------------------------------------------------------------|
| `guildChannelPermissionsUpdate` | Emitted whenever a channel's permission overwrite for a guild is updated. |

### Guild Events

| Event Name                | Description                                                |
|---------------------------|------------------------------------------------------------|
| `guildBoostLevelUp`       | Emitted whenever a guild's boost level increases.          |
| `guildBoostLevelDown`     | Emitted whenever a guild's boost level decreases.          |
| `guildBannerAdd`          | Emitted whenever a guild's banner is added.                |
| `guildAfkChannelAdd`      | Emitted whenever a guild's AFK channel is added.           |
| `guildVanityURLAdd`       | Emitted whenever a guild's vanity URL is added.            |
| `guildVanityURLUpdate`    | Emitted whenever a guild's vanity URL is updated.          |
| `guildVanityURLRemove`    | Emitted whenever a guild's vanity URL is removed.          |
| `guildFeaturesUpdate`     | Emitted whenever a guild's features are updated.           |
| `guildAcronymUpdate`      | Emitted whenever a guild's acronym is updated.             |
| `guildOwnerUpdate`        | Emitted whenever a guild's owner is updated.               |
| `guildPartnerAdd`         | Emitted whenever a guild's is partner of discord now       |
| `guildPartnerRemove`      | Emitted whenever a guild's is no longer partner of discord |
| `guildVerificationAdd`    | Emitted whenever a guild's verification level is added.    |
| `guildVerificationRemove` | Emitted whenever a guild's verification level is removed.  |

#### Guild Audit Log Events

| Event Name                        | Description                                              |
|-----------------------------------|----------------------------------------------------------|
| `guildAuditLogEntryAdd`           | Emitted whenever an entry is added to the audit log.     |
| `guildAuditLogEntryUpdate`        | Emitted whenever an entry is updated in the audit log.   |
| `guildAuditLogEntryDelete`        | Emitted whenever an entry is removed from the audit log. |
| `guildAuditLogEntryWebhookCreate` | Emitted whenever a webhook is created in the audit log.  |
| `guildAuditLogEntryWebhookUpdate` | Emitted whenever a webhook is updated in the audit log.  |
| `guildAuditLogEntryWebhookDelete` | Emitted whenever a webhook is deleted in the audit log.  |

#### Guild Member Events

| Event Name                  | Description                                       |
|-----------------------------|---------------------------------------------------|
| `guildMemberBoost`          | Emitted whenever a member's boost is activated.   |
| `guildMemberUnboost`        | Emitted whenever a member's boost is deactivated. |
| ` guildMemberRoleAdd`       | Emitted whenever a role is added to a member.     |
| `guildMemberRoleRemove`     | Emitted whenever a role is removed from a member. |
| `guildMemberNicknameUpdate` | Emitted whenever a member's nickname is updated.  |
| `guildMemberEntered`        | Emitted whenever a member enters a guild.         |
| `guildMemberAvatarAdd`      | Emitted whenever a member's avatar is added.      |
| `guildMemberAvatarRemove`   | Emitted whenever a member's avatar is removed.    |
| `guildMemberAvatarUpdate`   | Emitted whenever a member's avatar is updated.    |

#### Role Update Events

| Event Name              | Description                                        |
|-------------------------|----------------------------------------------------|
| `rolePositionUpdate`    | Emitted whenever a role's position is updated.     |
| `rolePermissionsUpdate` | Emitted whenever a role's permissions are updated. |
| `roleIconAdd`           | Emitted whenever a role's icon is added.           |
| `roleIconRemove`        | Emitted whenever a role's icon is removed.         |
| `roleIconUpdate`        | Emitted whenever a role's icon is updated.         |

#### Thread Update Events

| Event Name                        | Description                                                   |
|-----------------------------------|---------------------------------------------------------------|
| `threadStateUpdate`               | Emitted whenever a thread's state is updated.                 |
| `threadNameUpdate`                | Emitted whenever a thread's name is updated.                  |
| `threadLockStateUpdate`           | Emitted whenever a thread's lock state is updated.            |
| `threadRateLimitPerUserUpdate`    | Emitted whenever a thread's rate limit per user is updated.   |
| `threadAutoArchiveDurationUpdate` | Emitted whenever a thread's auto archive duration is updated. |

### Message Events

| Event Name             | Description                            |
|------------------------|----------------------------------------|
| `messagePinned`        | Emitted whenever a message is pinned.  |
| `messageContentEdited` | Emitted whenever a message is updated. |

### Presence Events

| Event Name           | Description                             |
|----------------------|-----------------------------------------|
| `guildMemberOffline` | Emitted whenever a member goes offline. |
| `guildMemberOnline`  | Emitted whenever a member goes online.  |

### User Events

| Event Name                | Description                                         |
|---------------------------|-----------------------------------------------------|
| `userAvatarUpdate`        | Emitted whenever a user's avatar is updated.        |
| `userUsernameUpdate`      | Emitted whenever a user's username is updated.      |
| `userDiscriminatorUpdate` | Emitted whenever a user's discriminator is updated. |
| `userFlagsUpdate`         | Emitted whenever a user's flags are updated.        |

### Voice Events

| Event Name              | Description                                                        |
|-------------------------|--------------------------------------------------------------------|
| `voiceChannelJoin`      | Emitted whenever a member joins a voice channel.                   |
| `voiceChannelLeave`     | Emitted whenever a member leaves a voice channel.                  |
| `voiceChannelSwitch`    | Emitted whenever a member switches voice channel.                  |
| `voiceChannelMutestate` | Emitted whenever a member is muted or deafened in a voice channel. |
| `voiceChannelUnmute`    | Emitted whenever a member is unmuted in a voice channel.           |
| `voiceChannelDeaf`      | Emitted whenever a member is deafened in a voice channel.          |
| `voiceChannelUndeaf`    | Emitted whenever a member is undeafened in a voice channel.        |
| `voiceStreamingStart`   | Emitted whenever a member starts streaming.                        |
| `voiceStreamingStop`    | Emitted whenever a member stops streaming.                         |
