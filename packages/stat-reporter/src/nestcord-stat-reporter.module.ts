import { Global, Module } from '@nestjs/common';
import { NestCordStatReporterConfigurableModule } from './nestcord-stat-reporter.module-definition';
import { NestCordStatReporterService } from './nestcord-stat-reporter.service';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';

@Global()
@Module({
  imports: [ScheduleModule.forRoot(), HttpModule],
  providers: [NestCordStatReporterService],
  exports: [NestCordStatReporterService],
})
export class NestCordStatReporterModule extends NestCordStatReporterConfigurableModule {}
