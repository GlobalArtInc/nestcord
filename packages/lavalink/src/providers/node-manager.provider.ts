import { Provider } from '@nestjs/common';
import { LavalinkManager, NodeManager } from 'lavalink-client';

export const NodeManagerProvider: Provider<NodeManager> = {
  provide: NodeManager,
  useFactory: (lavalinkManager: LavalinkManager) => lavalinkManager.nodeManager,
  inject: [LavalinkManager],
};
