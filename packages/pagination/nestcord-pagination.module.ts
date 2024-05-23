import { Global, Module } from '@nestjs/common';
import { NestCordPaginationService } from './nestcord-pagination.service';
import { NestCordPaginationController } from './nestcord-pagination.controller';
import { ConfigurableModuleClass } from './nestcord-pagination.module-definition';

@Global()
@Module({
	providers: [NestCordPaginationService, NestCordPaginationController],
	exports: [NestCordPaginationService]
})
export class NestCordPaginationModule extends ConfigurableModuleClass {}
