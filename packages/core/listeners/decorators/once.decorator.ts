import { Listener } from './listener.decorator';
import { NestCordEvents } from '../listener.interface';

/**
 * Decorator that marks a method as a listener for discord.js client.
 * @param event
 * @returns The decorated method.
 */
export const Once = <K extends keyof E, E = NestCordEvents>(event: K) => Listener({ type: 'once', event });
