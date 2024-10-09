import { NestCordLavalinkManagerEvents, NestCordNodeManagerEvents } from '../listeners';

// eslint-disable-next-line no-use-before-define
export type LavalinkManagerContextOf<K extends keyof E, E = NestCordLavalinkManagerEvents> = E[K];
// eslint-disable-next-line no-use-before-define
export type NodeManagerContextOf<K extends keyof E, E = NestCordNodeManagerEvents> = E[K];
