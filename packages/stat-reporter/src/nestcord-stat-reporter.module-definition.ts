import { ConfigurableModuleBuilder } from '@nestjs/common';
import { NestCordStatReporterOptions } from './interfaces';

export const {
  ConfigurableModuleClass: NestCordStatReporterConfigurableModule,
  MODULE_OPTIONS_TOKEN: NESTCORD_STAT_REPORTER_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<NestCordStatReporterOptions>()
  .setClassMethodName('forRoot')
  .setFactoryMethodName('createModuleConfig')
  .build();
