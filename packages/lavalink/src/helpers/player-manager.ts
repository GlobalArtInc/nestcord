import { DestroyReasonsType, LavalinkManager, Player, PlayerOptions } from 'lavalink-client';

export class PlayerManager {
  public constructor(private readonly lavalinkManager: LavalinkManager) {}

  public get(guildId: string) {
    return this.lavalinkManager.getPlayer(guildId);
  }

  public create(options: PlayerOptions): Player {
    return this.lavalinkManager.createPlayer(options);
  }

  public async destroy(guildId: string, destroyReason?: DestroyReasonsType): Promise<void | Player> {
    return await this.lavalinkManager.destroyPlayer(guildId, destroyReason);
  }

  public delete(guildId: string) {
    this.lavalinkManager.deletePlayer(guildId);
  }
}
