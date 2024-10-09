import { LavalinkManagerEvents, NodeManagerEvents } from 'lavalink-client';

type FormatEventInterface<T> = {
  [K in keyof T]: T[K] extends (...args: infer P) => void ? P : never;
};

export type NestCordLavalinkManagerEvents = FormatEventInterface<LavalinkManagerEvents>;

export type NestCordNodeManagerEvents = FormatEventInterface<NodeManagerEvents>;

export type NestCordLavalinkEvents = NestCordLavalinkManagerEvents & NestCordNodeManagerEvents;
