import { Listener } from './listener.decorator';
import { NestCordEvents } from '../listener.interface';

/**
 * Decorator that marks a method as a listener for discord.js client.
 * @param event - The event name to listen for once.
 * @returns The decorated method.
 */
export const Once = <K extends keyof NestCordEvents>(event: K | K[]) => Listener({ type: 'once', event });
