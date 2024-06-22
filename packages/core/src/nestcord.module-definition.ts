import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NestCordModuleOptions } from './nestcord-options.interface';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: NESTCORD_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<NestCordModuleOptions>()
  .setClassMethodName('forRoot')
  .setFactoryMethodName('createNestCordOptions')
  .build();
