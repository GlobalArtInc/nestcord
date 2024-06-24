import { Global, Module, DynamicModule } from '@nestjs/common';
import { NestCordPaginationService } from './nestcord-pagination.service';
import {
  NESTCORD_PAGINATION_MODULE_OPTIONS,
  NestCordPaginationConfigurableModule,
} from './nestcord-pagination.module-definition';
import { NestCordPaginationOptions } from './interfaces';

@Global()
@Module({
  providers: [NestCordPaginationService],
  exports: [NestCordPaginationService, NESTCORD_PAGINATION_MODULE_OPTIONS],
})
export class NestCordPaginationModule extends NestCordPaginationConfigurableModule {
  static forRoot(options?: NestCordPaginationOptions): DynamicModule {
    return {
      module: NestCordPaginationModule,
      providers: [
        {
          provide: NESTCORD_PAGINATION_MODULE_OPTIONS,
          useValue: options || {},
        },
        NestCordPaginationService,
      ],
      exports: [NestCordPaginationService, NESTCORD_PAGINATION_MODULE_OPTIONS],
    };
  }
}
