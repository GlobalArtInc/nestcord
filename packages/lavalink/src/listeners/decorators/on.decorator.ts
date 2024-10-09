import { LavalinkListener } from './listener.decorator';
import { LavalinkHostType, LavalinkListenerType } from '../enums';
import { NestCordLavalinkManagerEvents, NestCordNodeManagerEvents } from '../interfaces';

/**
 * Decorator that marks a method as a listener for Lavalink client.
 * @param event The event name.
 * @returns The decorated method.
 */
export const OnLavalinkManager = <K extends keyof NestCordLavalinkManagerEvents>(event: K) =>
  LavalinkListener({
    type: LavalinkListenerType.On,
    event,
    host: LavalinkHostType.LavalinkManager,
  });

/**
 * Decorator that marks a method as a listener for Lavalink client.
 * @param event The event name.
 * @returns The decorated method.
 */
export const OnNodeManager = <K extends keyof NestCordNodeManagerEvents>(event: K) =>
  LavalinkListener({ type: LavalinkListenerType.On, event, host: LavalinkHostType.NodeManager });
