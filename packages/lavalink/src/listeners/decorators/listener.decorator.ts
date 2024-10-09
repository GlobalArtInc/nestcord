import { Reflector } from '@nestjs/core';
import { LavalinkListenerMeta } from '../interfaces';

/**
 * Decorator that marks a method as a listener for discord.js client.
 * @param options The listener options.
 * @returns The decorated method.
 */
export const LavalinkListener = Reflector.createDecorator<LavalinkListenerMeta>({
  transform: (options) => options,
});
