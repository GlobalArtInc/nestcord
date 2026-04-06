import { ForbiddenException } from '@nestjs/common';

/** Thrown by {@link CooldownGuard} when the user invokes a handler before the cooldown has elapsed. */
export class CooldownException extends ForbiddenException {
  /** Milliseconds remaining until the cooldown expires. */
  public readonly remainingMs: number;

  constructor(lastUsedAt: number, cooldownMs: number) {
    const remaining = cooldownMs - (Date.now() - lastUsedAt);
    super('You are on cooldown');
    this.remainingMs = Math.max(0, remaining);
  }
}
