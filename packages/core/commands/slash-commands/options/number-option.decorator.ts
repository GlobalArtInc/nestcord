import { ApplicationCommandOptionType, APIApplicationCommandNumberOption } from 'discord.js';
import { createOptionDecorator } from './option.util';

/**
 * Param decorator that marks a method as a number option.
 * @param options The number options.
 * @returns The decorated method.
 */
export const NumberOption = createOptionDecorator<APIApplicationCommandNumberOption>(
	ApplicationCommandOptionType.Number,
	'getNumber'
);
