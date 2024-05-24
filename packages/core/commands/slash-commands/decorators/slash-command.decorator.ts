import { SlashCommandDiscovery, SlashCommandMeta } from '../slash-command.discovery';
import { ApplicationCommandType } from 'discord.js';
import { Reflector } from '@nestjs/core';

/**
 * Decorator that marks a method as a slash command.
 * @param options The slash command options.
 * @returns The decorated method.
 * @see SlashCommandDiscovery
 * @see SlashCommandMeta
 *
 */
export const SlashCommand = Reflector.createDecorator<
	Omit<SlashCommandMeta, 'type' | 'options'>,
	SlashCommandDiscovery
>({
	transform: options =>
		new SlashCommandDiscovery({
			type: ApplicationCommandType.ChatInput,
			...options
		})
});
