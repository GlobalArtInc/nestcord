import { Global, Module, OnApplicationBootstrap, OnModuleInit } from '@nestjs/common';
import { MessageComponentsService } from './message-components.service';
import { Client } from 'discord.js';
import { ExplorerService } from '../nestcord-explorer.service';
import { MessageComponentDiscovery } from './message-component.discovery';
import { MessageComponent } from './decorators';

@Global()
@Module({
  providers: [MessageComponentsService],
  exports: [MessageComponentsService],
})
export class MessageComponentsModule implements OnModuleInit, OnApplicationBootstrap {
  public constructor(
    private readonly client: Client,
    private readonly explorerService: ExplorerService<MessageComponentDiscovery>,
    private readonly messageComponentsService: MessageComponentsService,
  ) {}

  public onModuleInit() {
    return this.explorerService
      .explore(MessageComponent.KEY)
      .forEach((component) => this.messageComponentsService.add(component));
  }

  public onApplicationBootstrap() {
    return this.client.on('interactionCreate', (interaction) => {
      if (!interaction.isMessageComponent()) return;

      return this.messageComponentsService.get(interaction.componentType, interaction.customId)?.execute(interaction);
    });
  }
}
