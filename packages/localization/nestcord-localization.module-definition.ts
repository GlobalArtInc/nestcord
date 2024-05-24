import { ConfigurableModuleBuilder, Provider } from '@nestjs/common';
import { NestCordLocalizationOptions } from './interfaces';
import { DefaultLocalizationAdapter } from './adapters';
import { LOCALIZATION_ADAPTER, LOCALIZATION_RESOLVERS } from './providers';
import { UserResolver } from './resolvers';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
	new ConfigurableModuleBuilder<NestCordLocalizationOptions>()
		.setClassMethodName('forRoot')
		.setFactoryMethodName('createModuleConfig')
		.setExtras<NestCordLocalizationOptions>(
			{
				adapter: new DefaultLocalizationAdapter(),
				resolvers: UserResolver
			},
			(definition, extras) => {
				const adapterProvider: Provider = {
					provide: LOCALIZATION_ADAPTER,
					useFactory: (options: NestCordLocalizationOptions) => options.adapter,
					inject: [MODULE_OPTIONS_TOKEN]
				};
				const resolversProviders: Provider = {
					provide: LOCALIZATION_RESOLVERS,
					useValue: Array.isArray(extras.resolvers)
						? extras.resolvers
						: [extras.resolvers]
				};
				
				return {
					...definition,
					providers: [adapterProvider, ...definition.providers, resolversProviders],
					exports: [...(definition.exports || []), adapterProvider]
				};
			}
		)
		.build();
