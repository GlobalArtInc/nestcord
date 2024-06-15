import { Listener } from './listener.decorator';
import { NestCordEvents } from '../listener.interface';

/**
 * Decorator that marks a method as a listener for discord.js client.
 * @param event - The event or events name.
 * @returns The decorated method.
 */
export const On = <K extends keyof NestCordEvents>(event: K | K[]) => Listener({ type: 'on', event });
