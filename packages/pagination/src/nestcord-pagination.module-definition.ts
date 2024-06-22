import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NestCordPaginationOptions } from './interfaces';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<NestCordPaginationOptions>()
    .setClassMethodName('forRoot')
    .setFactoryMethodName('createModuleConfig')
    .build();
