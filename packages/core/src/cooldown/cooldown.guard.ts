import { CanActivate, ExecutionContext, Inject, Injectable, Optional } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Message } from 'discord.js';
import { AnyContext, NestCordExecutionContext, SlashCommandContext } from '../context';
import { COOLDOWN_METADATA_KEY, COOLDOWN_STORAGE } from './cooldown.constants';
import { CooldownException } from './cooldown.exception';
import { CooldownStorage } from './storages/cooldown-storage.interface';
import { MemoryCooldownStorage } from './storages/memory-cooldown.storage';

@Injectable()
export class CooldownGuard implements CanActivate {
  private readonly storage: CooldownStorage;

  constructor(
    private readonly reflector: Reflector,
    @Optional() @Inject(COOLDOWN_STORAGE) storage?: CooldownStorage,
  ) {
    this.storage = storage ?? new MemoryCooldownStorage();
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const ms = this.reflector.getAllAndOverride<number>(COOLDOWN_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!ms) return true;

    const nestcordContext = NestCordExecutionContext.create(context);
    const [interaction] = nestcordContext.getContext<AnyContext>();

    const userId = interaction instanceof Message ? interaction.author.id : interaction.user?.id;

    if (!userId) return true;

    const handlerKey = `${context.getClass().name}:${context.getHandler().name}`;
    const cacheKey = `nestcord:cooldown:${handlerKey}:${userId}`;
    const now = Date.now();
    const lastUsed = await this.storage.get(cacheKey);

    if (lastUsed !== null && now - lastUsed < ms) {
      throw new CooldownException(lastUsed, ms);
    }

    await this.storage.set(cacheKey, now, ms);
    return true;
  }
}
