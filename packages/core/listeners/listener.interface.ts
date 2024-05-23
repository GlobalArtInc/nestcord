import { ClientEvents } from 'discord.js';
import {
	CustomChannelUpdateEvents,
	CustomGuildAuditLogEntryCreateEvents,
	CustomGuildMemberUpdateEvents,
	CustomGuildUpdateEvents,
	CustomMessageUpdateEvents,
	CustomPresenceUpdateEvents,
	CustomRoleUpdateEvents,
	CustomThreadUpdateEvents,
	CustomUserUpdateEvents,
	CustomVoiceStateUpdateEvents
} from './handlers';

export type NestCordEvents = ClientEvents &
	CustomChannelUpdateEvents &
	CustomGuildAuditLogEntryCreateEvents &
	CustomGuildMemberUpdateEvents &
	CustomGuildUpdateEvents &
	CustomMessageUpdateEvents &
	CustomPresenceUpdateEvents &
	CustomRoleUpdateEvents &
	CustomThreadUpdateEvents &
	CustomUserUpdateEvents &
	CustomVoiceStateUpdateEvents;
