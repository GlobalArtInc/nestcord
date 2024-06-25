import { ApplicationCommand, BaseApplicationCommandData, Collection, Snowflake } from 'discord.js';
import { NestCordBaseDiscovery } from '../context';

export interface BaseCommandMeta extends BaseApplicationCommandData {
  guilds?: Snowflake[];
  category?: string;
  discordResponse?: ApplicationCommand;
}

/**
 * Represents a command discovery.
 * @abstract
 */
export abstract class CommandDiscovery<T extends BaseCommandMeta = BaseCommandMeta> extends NestCordBaseDiscovery<T> {
  /**
   * Return the command ID
   */
  public getId() {
    return this.meta.discordResponse?.id;
  }

  /**
   * Return the discord response of command
   */
  public getDiscordResponse() {
    return this.meta.discordResponse;
  }

  /**
   * Returns the command name.
   */
  public getName(): string {
    return this.meta.name;
  }

  /**
   * Get command category
   */
  public getCategory(): string | undefined {
    return this.meta.category;
  }

  /**
   * Sets the command guilds for register.
   * @param guilds
   */
  public setGuilds(guilds: Snowflake[]): void {
    this.meta.guilds = guilds;
  }

  /**
   * Checks if the command has a guild.
   * @param guild
   */
  public hasGuild(guild: Snowflake): boolean {
    return this.meta.guilds?.includes(guild) ?? false;
  }

  /**
   * Returns the guilds.
   */
  public getGuilds(): Snowflake[] | undefined {
    return this.meta.guilds;
  }

  /**
   * Get sub commands
   */
  public getSubCommands() {
    if (this.isSlashCommand()) {
      return this.subcommands;
    }

    return new Collection();
  }

  public hasSubCommands() {
    if (this.isSlashCommand()) {
      return this.subcommands.size > 0;
    }

    return false;
  }
}
