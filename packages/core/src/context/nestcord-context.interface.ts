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
import { SlashCommandDiscovery } from '../commands';

export type AutocompleteContext = { interaction: AutocompleteInteraction };

export type SlashCommandContext = { interaction: ChatInputCommandInteraction };

export type TextCommandContext = { message: Message };

export type MessageCommandContext = { interaction: MessageContextMenuCommandInteraction };

export type UserCommandContext = { interaction: UserContextMenuCommandInteraction };

export type ModalContext = { interaction: ModalSubmitInteraction };

export type ButtonContext = { interaction: ButtonInteraction };

export type StringSelectContext = { interaction: StringSelectMenuInteraction };

export type ChannelSelectContext = { interaction: ChannelSelectMenuInteraction };

export type RoleSelectContext = { interaction: RoleSelectMenuInteraction };

export type UserSelectContext = { interaction: UserSelectMenuInteraction };

export type MentionableSelectContext = { interaction: MentionableSelectMenuInteraction };

export type ContextOf<K extends keyof E, E = NestCordEvents> = E[K];
