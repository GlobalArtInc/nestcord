import { MessageCommandContext, SlashCommandContext, UserCommandContext } from '../../../core';

export type CommandContext = MessageCommandContext | SlashCommandContext | UserCommandContext;
