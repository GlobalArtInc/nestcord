import { Global, Inject, Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { ContextMenusModule, ContextMenusService } from './context-menus';
import { SlashCommandsModule, SlashCommandsService } from './slash-commands';
import { CommandsService } from './commands.service';
import { Client } from 'discord.js';
import { NESTCORD_MODULE_OPTIONS } from '../nestcord.module-definition';
import { NestCordModuleOptions } from '../nestcord-options.interface';
import { CommandDiscovery } from './command.discovery';

@Global()
@Module({
  imports: [ContextMenusModule, SlashCommandsModule],
  providers: [CommandsService],
  exports: [ContextMenusModule, SlashCommandsModule, CommandsService],
})
export class CommandsModule implements OnModuleInit, OnApplicationBootstrap {
  constructor(
    private readonly client: Client,
    @Inject(NESTCORD_MODULE_OPTIONS)
    private readonly options: NestCordModuleOptions,
    private readonly commandsService: CommandsService,
    private readonly contextMenusService: ContextMenusService,
    private readonly slashCommandsService: SlashCommandsService,
  ) {}

  onModuleInit() {
    if (this.options.skipRegistration) {
      return;
    }

    this.client.once('ready', async () => {
      if (this.client.application.partial) {
        await this.client.application.fetch();
      }
      await this.commandsService.registerAllCommands();
    });
  }

  onApplicationBootstrap() {
    const commands: CommandDiscovery[] = [
      ...this.contextMenusService.cache.values(),
      ...this.slashCommandsService.cache.values(),
    ];

    commands.forEach((command) => {
      const guilds = Array.isArray(this.options.development)
        ? this.options.development
        : command.getGuilds() || [undefined];
      command.setGuilds(guilds);
    });
  }
}
