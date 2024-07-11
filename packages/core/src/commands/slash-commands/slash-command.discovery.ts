import {
  ApplicationCommand,
  ApplicationCommandOptionType,
  ApplicationCommandSubCommandData,
  ApplicationCommandSubGroupData,
  ApplicationCommandType,
  AutocompleteInteraction,
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  Collection,
  CommandInteractionOptionResolver,
  Snowflake,
} from 'discord.js';
import { APIApplicationCommandOptionBase } from 'discord-api-types/payloads/v10/_interactions/_applicationCommands/_chatInput/base';
import { BaseCommandMeta, CommandDiscovery } from '../command.discovery';
import { OPTIONS_METADATA } from './options';

interface BaseSlashCommandMeta {
  category?: string;
  guilds?: Snowflake[];
  discordResponse?: ApplicationCommand;
}

export interface ChatInputSlashCommandMeta extends BaseSlashCommandMeta, ChatInputApplicationCommandData {
  type: ApplicationCommandType.ChatInput;
}

export interface SubcommandSlashCommandMeta extends BaseSlashCommandMeta, ApplicationCommandSubCommandData {
  type: ApplicationCommandOptionType.Subcommand;
}

export interface SubcommandGroupSlashCommandMeta extends BaseCommandMeta, ApplicationCommandSubGroupData {
  type: ApplicationCommandOptionType.SubcommandGroup;
}

export type SlashCommandMeta = ChatInputSlashCommandMeta | SubcommandSlashCommandMeta | SubcommandGroupSlashCommandMeta;

export interface OptionMeta extends APIApplicationCommandOptionBase<ApplicationCommandOptionType> {
  resolver?: keyof CommandInteractionOptionResolver;
}

/**
 * Represents a slash command discovery.
 */
export class SlashCommandDiscovery extends CommandDiscovery<SlashCommandMeta> {
  public readonly subcommands = new Collection<string, SlashCommandDiscovery>();

  /**
   * Returns the command description.
   */
  public getDescription() {
    return this.meta.description;
  }

  /**
   * Sets the command description.
   * @param command The command discovery.
   */
  public setSubcommand(command: SlashCommandDiscovery) {
    this.subcommands.set(command.getName(), command);
  }

  /**
   * Ensures a subcommand exists.
   * @param command
   */
  public ensureSubcommand(command: SlashCommandDiscovery) {
    return this.subcommands.ensure(command.getName(), () => command);
  }

  /**
   * Returns the subcommand.
   * @param name
   */
  public getSubcommand(name: string) {
    return this.subcommands.get(name);
  }

  /**
   * Returns the subcommands.
   */
  public getSubcommands() {
    return this.subcommands;
  }

  /**
   * Returns raw options from metadata.
   */
  public getRawOptions(): Record<string, OptionMeta> {
    return this.reflector.get(OPTIONS_METADATA, this.getHandler()) || {};
  }

  /**
   * Returns the options.
   */
  public getOptions() {
    if (this.subcommands.size >= 1) {
      return [...this.subcommands.values()].map((subcommand) => subcommand.toJSON());
    }

    return Object.values(this.getRawOptions());
  }

  /**
   * Executes the command.
   * @param interaction
   * @param depth
   */
  public execute(interaction: ChatInputCommandInteraction | AutocompleteInteraction, depth = 1) {
    if (this.subcommands.size >= 1) {
      const commandName =
        depth === 2
          ? interaction.options.getSubcommand(true)
          : interaction.options.getSubcommandGroup(false) || interaction.options.getSubcommand(true);

      return this.subcommands.get(commandName)?.execute(interaction, depth + 1);
    }

    return super.execute({ interaction });
  }

  /**
   * Returns whether the discovery is a slash command.
   */
  public isSlashCommand(): this is SlashCommandDiscovery {
    return true;
  }

  /**
   * Returns the JSON representation of the discovery.
   */
  public override toJSON() {
    return {
      ...this.meta,
      options: this.getOptions(),
    };
  }
}
