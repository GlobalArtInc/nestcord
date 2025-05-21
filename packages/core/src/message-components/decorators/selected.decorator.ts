import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
  ChannelSelectMenuInteraction,
  Collection,
  MentionableSelectMenuInteraction,
  RoleSelectMenuInteraction,
  UserSelectMenuInteraction,
} from 'discord.js';
import { NestCordExecutionContext } from '../../context';

export const SelectedStrings = createParamDecorator<void, string[]>((_, ctx: ExecutionContext) => {
  const nestcordContext = NestCordExecutionContext.create(ctx);
  const [interaction] = nestcordContext.getContext<'interactionCreate'>();

  return interaction.isStringSelectMenu() ? interaction.values : [];
});

export type ISelectedChannels = ChannelSelectMenuInteraction['channels'];
export const SelectedChannels = createParamDecorator<void, ISelectedChannels>((_, ctx: ExecutionContext) => {
  const nestcordContext = NestCordExecutionContext.create(ctx);
  const [interaction] = nestcordContext.getContext<'interactionCreate'>();

  return interaction.isChannelSelectMenu() ? interaction.channels : new Collection();
});

export type ISelectedUsers = UserSelectMenuInteraction['users'] | MentionableSelectMenuInteraction['users'];
export const SelectedUsers = createParamDecorator<void, ISelectedUsers>((_, ctx: ExecutionContext) => {
  const nestcordContext = NestCordExecutionContext.create(ctx);
  const [interaction] = nestcordContext.getContext<'interactionCreate'>();

  if (interaction.isUserSelectMenu() || interaction.isMentionableSelectMenu()) {
    return interaction.users;
  }

  return new Collection();
});

export type ISelectedMembers = UserSelectMenuInteraction['members'] | MentionableSelectMenuInteraction['members'];
export const SelectedMembers = createParamDecorator<void, ISelectedMembers>((_, ctx: ExecutionContext) => {
  const nestcordContext = NestCordExecutionContext.create(ctx);
  const [interaction] = nestcordContext.getContext<'interactionCreate'>();

  if (interaction.isUserSelectMenu() || interaction.isMentionableSelectMenu()) {
    return interaction.members;
  }

  return new Collection();
});

export type ISelectedRoles = RoleSelectMenuInteraction['roles'] | MentionableSelectMenuInteraction['roles'];
export const SelectedRoles = createParamDecorator<void, ISelectedRoles>((_, ctx: ExecutionContext) => {
  const nestcordContext = NestCordExecutionContext.create(ctx);
  const [interaction] = nestcordContext.getContext<'interactionCreate'>();

  if (interaction.isRoleSelectMenu() || interaction.isMentionableSelectMenu()) {
    return interaction.roles;
  }

  return new Collection();
});
