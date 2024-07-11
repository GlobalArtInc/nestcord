import { Global, Inject, Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { TextCommandsService } from './text-commands.service';
import { TextCommand } from './decorators';
import { NESTCORD_MODULE_OPTIONS } from '../nestcord.module-definition';
import { NestCordModuleOptions } from '../nestcord-options.interface';
import { Client } from 'discord.js';
import { ExplorerService } from '../nestcord-explorer.service';
import { TextCommandDiscovery } from './text-command.discovery';

@Global()
@Module({
  providers: [TextCommandsService],
  exports: [TextCommandsService],
})
export class TextCommandsModule implements OnModuleInit, OnApplicationBootstrap {
  public constructor(
    @Inject(NESTCORD_MODULE_OPTIONS)
    private readonly options: NestCordModuleOptions,
    private readonly client: Client,
    private readonly explorerService: ExplorerService<TextCommandDiscovery>,
    private readonly textCommandsService: TextCommandsService,
  ) {}

  public onModuleInit() {
    return this.explorerService
      .explore(TextCommand.KEY)
      .forEach((textCommand) => this.textCommandsService.add(textCommand));
  }

  public onApplicationBootstrap() {
    return this.client.on('messageCreate', async (message) => {
      if (!message || !message.content?.length || message.webhookId || message.author.bot) {
        return;
      }

      const content = message.content.toLowerCase();
      const prefix =
        typeof this.options.prefix !== 'function' ? this.options.prefix || '!' : await this.options.prefix(message);

      if (!prefix || !content.startsWith(prefix)) {
        return;
      }

      const args = content.substring(prefix.length).split(/ +/g);
      const cmd = args.shift();

      if (!cmd) {
        return;
      }

      return this.textCommandsService.get(cmd)?.execute({ message });
    });
  }
}
