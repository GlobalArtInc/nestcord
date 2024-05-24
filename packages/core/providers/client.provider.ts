import { Provider } from '@nestjs/common';
import { Client } from 'discord.js';
import { NestCordModuleOptions } from '../nestcord-options.interface';
import { NESTCORD_MODULE_OPTIONS } from '../nestcord.module-definition';

export const ClientProvider: Provider<Client> = {
  provide: Client,
  useFactory: (options: NestCordModuleOptions) => new Client(options),
  inject: [NESTCORD_MODULE_OPTIONS],
};
