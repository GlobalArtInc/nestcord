import { ConfigurableModuleClass } from './nestcord-localization.module-definition';
import { Global, Module } from '@nestjs/common';
import { NestCordLocalizationService } from './nestcord-localization.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LocalizationInterceptor } from './interceptors';

@Global()
@Module({
	providers: [
		NestCordLocalizationService,
		{ provide: APP_INTERCEPTOR, useClass: LocalizationInterceptor }
	],
	exports: []
})
export class NestCordLocalizationModule extends ConfigurableModuleClass {}
