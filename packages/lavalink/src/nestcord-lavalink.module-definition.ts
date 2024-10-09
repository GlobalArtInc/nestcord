import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NestCordLavalinkModuleOptions } from './nestcord-lavalink-options.interface';

export const {
  ConfigurableModuleClass: NestCordLavaLinkConfigurableModule,
  MODULE_OPTIONS_TOKEN: LAVALINK_MODULE_OPTIONS,
} = new ConfigurableModuleBuilder<NestCordLavalinkModuleOptions>()
  .setClassMethodName('forRoot')
  .setFactoryMethodName('createNestCordLavalinkOptions')
  .build();
