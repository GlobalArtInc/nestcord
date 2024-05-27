import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NestCordStatReporterOptions } from './interfaces';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<NestCordStatReporterOptions>()
    .setClassMethodName('forRoot')
    .setFactoryMethodName('createModuleConfig')
    .build();
