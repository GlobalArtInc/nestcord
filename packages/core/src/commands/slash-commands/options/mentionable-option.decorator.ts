import { ApplicationCommandOptionType, APIApplicationCommandMentionableOption } from 'discord.js';
import { createOptionDecorator } from './option.util';

/**
 * Param decorator that marks a method as a mentionable option.
 * @param options The mentionable options.
 * @returns The decorated method.
 */
export const MentionableOption = createOptionDecorator<APIApplicationCommandMentionableOption>(
  ApplicationCommandOptionType.Mentionable,
  'getMentionable',
);
