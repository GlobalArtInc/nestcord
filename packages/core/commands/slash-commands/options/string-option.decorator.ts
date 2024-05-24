import { ApplicationCommandOptionType, APIApplicationCommandStringOption } from 'discord.js';
import { createOptionDecorator } from './option.util';

/**
 * Param decorator that marks a method as a string option.
 * @param options The string options.
 * @returns The decorated method.
 */
export const StringOption = createOptionDecorator<APIApplicationCommandStringOption>(
  ApplicationCommandOptionType.String,
  'getString',
);
