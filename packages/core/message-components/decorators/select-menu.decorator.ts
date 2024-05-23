import { ComponentType } from 'discord.js';
import { MessageComponent } from './message-component.decorator';

/**
 * Select Menu for picking defined text options
 * @param customId
 * @see SelectedStrings
 */
export const StringSelect = (customId: string) =>
	MessageComponent({ customId, type: ComponentType.StringSelect });

/**
 * Select Menu for selecting channels
 * @param customId
 * @see SelectedChannels
 */
export const ChannelSelect = (customId: string) =>
	MessageComponent({ customId, type: ComponentType.ChannelSelect });

/**
 * Select Menu for selecting users
 * @param customId
 * @see SelectedUsers
 * @see SelectedMembers
 */
export const UserSelect = (customId: string) =>
	MessageComponent({ customId, type: ComponentType.UserSelect });

/**
 * Select Menu for selecting members
 * @param customId
 * @see SelectedUsers
 * @see SelectedMembers
 * @see SelectedRoles
 */
export const MentionableSelect = (customId: string) =>
	MessageComponent({ customId, type: ComponentType.MentionableSelect });

/**
 * Select Menu for selecting roles
 * @param customId
 * @see SelectedRoles
 */
export const RoleSelect = (customId: string) =>
	MessageComponent({ customId, type: ComponentType.RoleSelect });
