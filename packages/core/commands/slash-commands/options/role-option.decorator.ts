import { ApplicationCommandOptionType, APIApplicationCommandRoleOption } from 'discord.js';
import { createOptionDecorator } from './option.util';

/**
 * Param decorator that marks a method as a role option.
 * @param options The role options.
 * @returns The decorated method.
 */
export const RoleOption = createOptionDecorator<APIApplicationCommandRoleOption>(
	ApplicationCommandOptionType.Role,
	'getRole'
);
