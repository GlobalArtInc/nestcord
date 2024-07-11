import { Global, Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { SlashCommandsService } from './slash-commands.service';
import { Client } from 'discord.js';
import { ExplorerService } from '../../nestcord-explorer.service';
import { SlashCommandDiscovery } from './slash-command.discovery';
import { SlashCommand, Subcommand } from './decorators';

@Global()
@Module({
  providers: [SlashCommandsService],
  exports: [SlashCommandsService],
})
export class SlashCommandsModule implements OnModuleInit, OnApplicationBootstrap {
  public constructor(
    private readonly client: Client,
    private readonly explorerService: ExplorerService<SlashCommandDiscovery>,
    private readonly slashCommandsService: SlashCommandsService,
  ) {}

  public onModuleInit() {
    this.explorerService.explore(SlashCommand.KEY).forEach((command) => this.slashCommandsService.add(command));

    return this.explorerService
      .explore(Subcommand.KEY)
      .forEach((subcommand) => this.slashCommandsService.addSubCommand(subcommand));
  }

  public onApplicationBootstrap() {
    return this.client.on('interactionCreate', (interaction) => {
      if (!interaction.isChatInputCommand() && !interaction.isAutocomplete()) {
        return;
      }

      return this.slashCommandsService.get(interaction.commandName)?.execute(interaction);
    });
  }
}
