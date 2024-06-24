import { applyDecorators } from '@nestjs/common';
import { ApplicationCommandOptionType } from 'discord.js';
import { SlashCommandDiscovery, SlashCommandMeta, SubcommandGroupSlashCommandMeta } from '../slash-command.discovery';
import { SlashCommand } from './slash-command.decorator';
import { noop } from 'rxjs';
import { Reflector } from '@nestjs/core';

/**
 * Decorator that marks a method as a subcommand.
 * @param options The subcommand options.
 * @returns The decorated method.
 * @see SlashCommandDiscovery
 */
export const SubcommandGroup = Reflector.createDecorator<
  Omit<SlashCommandMeta, 'type' | 'options' | 'guilds' | 'defaultMemberPermissions'>,
  SlashCommandDiscovery
>({
  transform: (options) =>
    new SlashCommandDiscovery({
      type: ApplicationCommandOptionType.SubcommandGroup,
      ...options,
    } as SubcommandGroupSlashCommandMeta),
});

/**
 * Factory that creates a decorator that marks a class as a slash command group.
 * @param rootOptions
 * @returns The decorator.
 * @see SlashCommand
 * @see SubcommandGroup
 */
export const createCommandGroupDecorator = (rootOptions: Omit<SlashCommandMeta, 'type'>) => {
  const rootCommand = SlashCommand(rootOptions);

  return (subOptions?: Omit<SlashCommandMeta, 'type'>): ClassDecorator => {
    const subCommandGroup = subOptions ? SubcommandGroup(subOptions) : noop;

    return applyDecorators(rootCommand, subCommandGroup);
  };
};
