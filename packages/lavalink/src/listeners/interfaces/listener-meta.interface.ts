import { NestCordLavalinkEvents } from './listener-events.interface';
import { LavalinkHostType, LavalinkListenerType } from '../enums';

export interface LavalinkListenerMeta {
  type: LavalinkListenerType;
  event: keyof NestCordLavalinkEvents;
  host: LavalinkHostType;
}
