import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CommandDiscovery, CommandsService } from '../../core';
import { LocalizationMap } from 'discord-api-types/v10';
import { LOCALIZATION_ADAPTER } from './providers';
import { DefaultLocalizationAdapter } from './adapters';
import { Locale } from 'discord.js';

interface CommandMetadata {
  nameLocalizations?: LocalizationMap;
  descriptionLocalizations?: LocalizationMap;
}

interface OptionMetadata {
  name_localizations?: LocalizationMap;
  description_localizations?: LocalizationMap;
  choices?: {
    name_localizations?: LocalizationMap;
    value: string | number;
  }[];
}

@Injectable()
export class NestCordLocalizationService implements OnModuleInit {
  public constructor(
    @Inject(LOCALIZATION_ADAPTER)
    private readonly localizationAdapter: DefaultLocalizationAdapter,
    private readonly commandsService: CommandsService,
  ) {}

  public onModuleInit() {
    this.updateCommandsLocalization();
  }

  async updateLocales(locales: Record<Locale, Record<string, string>>) {
    this.localizationAdapter.updateLocales(locales);
    this.updateCommandsLocalization();
  }

  private updateCommandsLocalization() {
    const commands = this.commandsService.getCommands().flatMap((command) => {
      if (command.isContextMenu()) {
        return command;
      }

      if (!command.isSlashCommand()) {
        return command;
      }

      const rootCommand = command;
      const subcommandGroups = [...rootCommand.getSubcommands().values()];
      const subcommands = subcommandGroups.flatMap((group) => [...group.getSubcommands().values()]);

      return [rootCommand, ...subcommandGroups, ...subcommands] as CommandDiscovery[];
    });

    for (const command of commands) {
      const commandMetadata: CommandMetadata = command['meta'];
      if (commandMetadata.nameLocalizations) {
        commandMetadata.nameLocalizations = this.getLocalizationMap(commandMetadata.nameLocalizations);
      }
      if (commandMetadata.descriptionLocalizations) {
        commandMetadata.descriptionLocalizations = this.getLocalizationMap(commandMetadata.descriptionLocalizations);
      }

      if (command.isSlashCommand() && command.getSubcommands().size === 0) {
        const rawOptions = command.getRawOptions();

        for (const key in rawOptions) {
          const optionMetadata: OptionMetadata = rawOptions[key];
          if (optionMetadata.name_localizations) {
            optionMetadata.name_localizations = this.getLocalizationMap(optionMetadata.name_localizations);
          }
          if (optionMetadata.description_localizations) {
            optionMetadata.description_localizations = this.getLocalizationMap(
              optionMetadata.description_localizations,
            );
          }
          if (optionMetadata.choices) {
            optionMetadata.choices = optionMetadata.choices.map((choice) => ({
              ...choice,
              name_localizations: this.getLocalizationMap(choice.name_localizations),
            }));
          }
        }
      }
    }
  }

  private getLocalizationMap(map: LocalizationMap): LocalizationMap {
    if (!map) {
      return undefined;
    }

    return Object.entries(map).reduce((acc, [locale, value]) => {
      acc[locale] = this.localizationAdapter.getTranslation(value, locale);

      return acc;
    }, {});
  }
}
