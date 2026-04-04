import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NestCordShardingModuleOptions } from './nestcord-sharding-options.interface';

export const {
  ConfigurableModuleClass: NestCordShardingConfigurableModule,
  MODULE_OPTIONS_TOKEN: SHARDING_MODULE_OPTIONS,
} = new ConfigurableModuleBuilder<NestCordShardingModuleOptions>()
  .setClassMethodName('forRoot')
  .setFactoryMethodName('createNestCordShardingOptions')
  .build();
