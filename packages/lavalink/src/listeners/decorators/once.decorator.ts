import { LavalinkListener } from './listener.decorator';
import { NestCordLavalinkManagerEvents, NestCordNodeManagerEvents } from '../interfaces';
import { LavalinkHostType, LavalinkListenerType } from '../enums';

/**
 * Decorator that marks a method as a listener for Lavalink client.
 * @param event The event name.
 * @returns The decorated method.
 */
export const OnceLavalinkManager = <K extends keyof NestCordLavalinkManagerEvents>(event: K) =>
  LavalinkListener({
    type: LavalinkListenerType.Once,
    event,
    host: LavalinkHostType.LavalinkManager,
  });

/**
 * Decorator that marks a method as a listener for Lavalink client.
 * @param event The event name.
 * @returns The decorated method.
 */
export const OnceNodeManager = <K extends keyof NestCordNodeManagerEvents>(event: K) =>
  LavalinkListener({
    type: LavalinkListenerType.Once,
    event,
    host: LavalinkHostType.NodeManager,
  });
