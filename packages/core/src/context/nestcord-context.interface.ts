import {
  AutocompleteInteraction,
  ButtonInteraction,
  ChannelSelectMenuInteraction,
  ChatInputCommandInteraction,
  MentionableSelectMenuInteraction,
  Message,
  MessageContextMenuCommandInteraction,
  ModalSubmitInteraction,
  RoleSelectMenuInteraction,
  StringSelectMenuInteraction,
  UserContextMenuCommandInteraction,
  UserSelectMenuInteraction,
} from 'discord.js';
import { NestCordEvents } from '../listeners';

export type AutocompleteContext = [AutocompleteInteraction];

export type SlashCommandContext = [ChatInputCommandInteraction];

export type TextCommandContext = [Message];

export type MessageCommandContext = [MessageContextMenuCommandInteraction];

export type UserCommandContext = [UserContextMenuCommandInteraction];

export type ModalContext = [ModalSubmitInteraction];

export type ButtonContext = [ButtonInteraction];

export type StringSelectContext = [StringSelectMenuInteraction];

export type ChannelSelectContext = [ChannelSelectMenuInteraction];

export type RoleSelectContext = [RoleSelectMenuInteraction];

export type UserSelectContext = [UserSelectMenuInteraction];

export type MentionableSelectContext = [MentionableSelectMenuInteraction];

export type ContextOf<K extends keyof E, E = NestCordEvents> = E[K];
