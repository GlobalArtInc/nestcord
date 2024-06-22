import { Listener } from './listener.decorator';
import { NestCordEvents } from '../listener.interface';

/**
 * Decorator that marks a method as a listener for discord.js client.
 * @param events - The event or events names.
 * @returns The decorated method.
 */
export const Once = <K extends keyof NestCordEvents>(events: K | K[]) => {
  const eventsArray = Array.isArray(events) ? events : [events];

  return function (target: string[], propertyKey: string, descriptor: PropertyDescriptor) {
    const decorators = eventsArray.map((event) => Listener({ type: 'once', event }));

    return Reflect.decorate(decorators, target, propertyKey, descriptor);
  } as MethodDecorator;
};
