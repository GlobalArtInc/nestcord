import { ManagerOptions } from 'lavalink-client';

export interface NestCordLavalinkModuleOptions extends Omit<ManagerOptions, 'sendToShard'> {
  sendToShard?: ManagerOptions['sendToShard'];
}
