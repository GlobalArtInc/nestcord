import { Global, Module } from '@nestjs/common';
import { NestCordPaginationService } from './nestcord-pagination.service';
import { ConfigurableModuleClass } from './nestcord-pagination.module-definition';

@Global()
@Module({
  providers: [NestCordPaginationService],
  exports: [NestCordPaginationService],
})
export class NestCordPaginationModule extends ConfigurableModuleClass {}
