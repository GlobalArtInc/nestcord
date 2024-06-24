import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NestCordPaginationOptions } from './interfaces';

export const {
  ConfigurableModuleClass: NestCordPaginationConfigurableModule,
  MODULE_OPTIONS_TOKEN: NESTCORD_PAGINATION_MODULE_OPTIONS,
} = new ConfigurableModuleBuilder<NestCordPaginationOptions>()
  .setClassMethodName('forRoot')
  .setFactoryMethodName('createModuleConfig')
  .build();
