import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NestCordModuleOptions } from './nestcord-options.interface';

export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: NESTCORD_MODULE_OPTIONS,
  OPTIONS_TYPE: NESTCORD_OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE: NESTCORD_ASYNC_OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<NestCordModuleOptions>()
  .setClassMethodName('forRoot')
  .setFactoryMethodName('createNestCordOptions')
  .build();
