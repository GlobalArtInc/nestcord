import { ApplicationCommandOptionType, APIApplicationCommandIntegerOption } from 'discord.js';
import { createOptionDecorator } from './option.util';

/**
 * Param decorator that marks a method as an integer option.
 * @param options The integer options.
 * @returns The decorated method.
 */
export const IntegerOption = createOptionDecorator<APIApplicationCommandIntegerOption>(
  ApplicationCommandOptionType.Integer,
  'getInteger',
);
