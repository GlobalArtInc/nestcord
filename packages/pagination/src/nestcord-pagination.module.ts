import { DynamicModule, Global, Module } from '@nestjs/common';
import { NestCordPaginationService } from './nestcord-pagination.service';
import { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } from './nestcord-pagination.module-definition';
import { NestCordPaginationOptions } from './interfaces';

@Global()
@Module({
  providers: [NestCordPaginationService],
  exports: [NestCordPaginationService],
})
export class NestCordPaginationModule extends ConfigurableModuleClass {
  static forRoot(options?: NestCordPaginationOptions): DynamicModule {
    const moduleOptions = options || {};

    return {
      module: NestCordPaginationModule,
      global: true,
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: moduleOptions,
        },
        NestCordPaginationService,
      ],
      exports: [NestCordPaginationService],
    };
  }

  static forFeature(options?: NestCordPaginationOptions): DynamicModule {
    const featureOptions = options || {};

    return {
      module: NestCordPaginationModule,
      providers: [
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: featureOptions,
        },
        NestCordPaginationService,
      ],
      exports: [NestCordPaginationService],
    };
  }
}
