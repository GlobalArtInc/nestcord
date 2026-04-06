import { ConfigurableModuleBuilder } from '@nestjs/common';
import { CooldownModuleOptions } from './cooldown-module-options.interface';

export const {
  ConfigurableModuleClass: CooldownConfigurableModule,
  MODULE_OPTIONS_TOKEN: COOLDOWN_MODULE_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<CooldownModuleOptions>()
  .setClassMethodName('forRoot')
  .setFactoryMethodName('createCooldownOptions')
  .build();
