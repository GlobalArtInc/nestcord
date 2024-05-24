import { ApplicationCommandOptionType, APIApplicationCommandBooleanOption } from 'discord.js';
import { createOptionDecorator } from './option.util';

/**
 * Param decorator that marks a method as a boolean option.
 * @param options The boolean options.
 * @returns The decorated method.
 */
export const BooleanOption = createOptionDecorator<APIApplicationCommandBooleanOption>(
	ApplicationCommandOptionType.Boolean,
	'getBoolean'
);
