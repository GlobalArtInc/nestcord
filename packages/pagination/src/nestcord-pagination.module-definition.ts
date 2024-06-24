import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NestCordPaginationOptions } from './interfaces';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN: NESTCORD_PAGINATION_OTPIONS } =
  new ConfigurableModuleBuilder<NestCordPaginationOptions>()
    .setClassMethodName('forRoot')
    .setFactoryMethodName('createModuleConfig')
    .build();
