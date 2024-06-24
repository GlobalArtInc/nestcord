import { DynamicModule, Global, Module } from '@nestjs/common';
import { NestCordPaginationService } from './nestcord-pagination.service';
import { ConfigurableModuleClass, NESTCORD_PAGINATION_OTPIONS } from './nestcord-pagination.module-definition';
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
          provide: NESTCORD_PAGINATION_OTPIONS,
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
          provide: NESTCORD_PAGINATION_OTPIONS,
          useValue: featureOptions,
        },
        NestCordPaginationService,
      ],
      exports: [NestCordPaginationService],
    };
  }
}
