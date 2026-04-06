import { SetMetadata } from '@nestjs/common';
import { PermissionResolvable } from 'discord.js';

export const PERMISSIONS_METADATA_KEY = 'nestcord:permissions';

/** Sets the required Discord member permissions for a command or component handler. */
export const Permissions = (...permissions: PermissionResolvable[]) =>
  SetMetadata(PERMISSIONS_METADATA_KEY, permissions);
