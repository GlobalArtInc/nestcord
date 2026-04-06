import { ForbiddenException } from '@nestjs/common';
import { PermissionResolvable } from 'discord.js';

/** Thrown by {@link PermissionsGuard} when the invoking member lacks required Discord permissions. */
export class InsufficientPermissionsException extends ForbiddenException {
  constructor(public readonly required: PermissionResolvable[]) {
    super('Insufficient permissions');
  }
}
