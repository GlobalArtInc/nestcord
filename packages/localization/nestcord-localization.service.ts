import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CommandDiscovery, CommandsService } from '../core';
import { LocalizationMap } from 'discord-api-types/v10';
import { LOCALIZATION_ADAPTER } from './providers';
import { DefaultLocalizationAdapter } from './adapters';

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

  async updateLocales(locales: any) {
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
      const commandMetadata: Record<string, any> = command['meta'];
      commandMetadata.nameLocalizations = this.getLocalizationMap(commandMetadata.nameLocalizations);
      commandMetadata.descriptionLocalizations = this.getLocalizationMap(commandMetadata.descriptionLocalizations);

      if (command.isSlashCommand() && command.getSubcommands().size === 0) {
        const rawOptions = command.getRawOptions();

        for (const key in rawOptions) {
          const optionMetadata: Record<string, any> = rawOptions[key];
          optionMetadata.name_localizations = this.getLocalizationMap(optionMetadata.name_localizations);
          optionMetadata.description_localizations = this.getLocalizationMap(optionMetadata.description_localizations);
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
      return;
    }

    return Object.entries(map).reduce((acc, [locale, value]) => {
      acc[locale] = this.localizationAdapter.getTranslation(value, locale);

      return acc;
    }, {});
  }
}
