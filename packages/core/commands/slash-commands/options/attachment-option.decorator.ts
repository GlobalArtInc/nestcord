import { ApplicationCommandOptionType, APIApplicationCommandAttachmentOption } from 'discord.js';
import { createOptionDecorator } from './option.util';

/**
 * Param decorator that marks a method as an attachment option.
 * @param options The attachment options.
 * @returns The decorated method.
 */
export const AttachmentOption = createOptionDecorator<APIApplicationCommandAttachmentOption>(
  ApplicationCommandOptionType.Attachment,
  'getAttachment',
);
