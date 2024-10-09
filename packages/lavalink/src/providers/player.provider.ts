import { Provider } from '@nestjs/common';
import { LavalinkManager } from 'lavalink-client';
import { PlayerManager } from '../helpers/player-manager';

export const PlayerProvider: Provider<PlayerManager> = {
  provide: PlayerManager,
  useFactory: (lavalinkManager: LavalinkManager) => new PlayerManager(lavalinkManager),
  inject: [LavalinkManager],
};
