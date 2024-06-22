import { Listener } from './listener.decorator';
import { NestCordEvents } from '../listener.interface';
import 'reflect-metadata';

/**
 * Decorator that marks a method as a listener for discord.js client.
 * @param events - The event or events names.
 * @returns The decorated method.
 */
export const On = <E extends keyof NestCordEvents>(events: E | E[]): MethodDecorator => {
  const eventsArray = Array.isArray(events) ? events : [events];

  return (target: string, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    const decorators = eventsArray.map((event: E) => Listener({ type: 'on', event }));

    return Reflect.decorate(decorators, target, propertyKey, descriptor);
  };
};
