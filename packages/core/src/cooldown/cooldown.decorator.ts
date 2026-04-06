import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { COOLDOWN_METADATA_KEY } from './cooldown.constants';
import { CooldownGuard } from './cooldown.guard';

/** Sets a per-user cooldown (in milliseconds) and automatically applies {@link CooldownGuard}. */
export const Cooldown = (ms: number) =>
  applyDecorators(SetMetadata(COOLDOWN_METADATA_KEY, ms), UseGuards(CooldownGuard));
