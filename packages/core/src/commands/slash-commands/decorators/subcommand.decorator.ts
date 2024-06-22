import { SlashCommandDiscovery, SlashCommandMeta } from '../slash-command.discovery';
import { ApplicationCommandOptionType } from 'discord.js';
import { Reflector } from '@nestjs/core';
import { SlashCommand } from './slash-command.decorator';

/**
 * Decorator that marks a method as a subcommand.
 * @param options The subcommand options.
 * @returns The decorated method.
 * @see SlashCommandDiscovery
 */
export const Subcommand = Reflector.createDecorator<
  Omit<SlashCommandMeta, 'type' | 'options' | 'guilds' | 'defaultMemberPermissions'>,
  SlashCommandDiscovery
>({
  transform: (options) =>
    new SlashCommandDiscovery({
      type: ApplicationCommandOptionType.Subcommand,
      ...options,
    }),
});
