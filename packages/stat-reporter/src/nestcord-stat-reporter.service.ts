import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client, ShardClientUtil } from 'discord.js';
import { NESTCORD_STAT_REPORTER_OPTIONS_TOKEN } from './nestcord-stat-reporter.module-definition';
import { NestCordStatReporterOptions, ServiceOption } from './interfaces';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { HttpService } from '@nestjs/axios';
import { replacePlaceholdersInObject } from '@globalart/text-utils';
import { from, lastValueFrom, mergeMap } from 'rxjs';

@Injectable()
export class NestCordStatReporterService implements OnModuleInit {
  private readonly logger = new Logger(NestCordStatReporterService.name);

  constructor(
    private readonly client: Client,
    private readonly shard: ShardClientUtil,
    @Inject(NESTCORD_STAT_REPORTER_OPTIONS_TOKEN) private readonly options: NestCordStatReporterOptions,
    private readonly schedulerRegistry: SchedulerRegistry,
    private readonly httpService: HttpService,
  ) {}

  onModuleInit() {
    this.client.once('ready', () => {
      if (this.isFirstShard() && this.isProduction()) {
        this.setupCronJobs();
      }
    });
  }

  private isFirstShard(): boolean {
    return !this.shard || (Array.isArray(this.shard.ids) && this.shard.ids[0] === 0);
  }

  private isProduction(): boolean {
    return !this.options.development;
  }

  private setupCronJobs() {
    this.options.services.forEach((service) => {
      const job = new CronJob(service.schedule, () => this.reportStats(service));
      this.schedulerRegistry.addCronJob(service.name, job);
      job.start();
      this.logger.log(`Job for ${service.name} scheduled with cron pattern: ${service.schedule}`);
    });
  }

  private async reportStats(service: ServiceOption) {
    try {
      await this.client.application.fetch();

      const [serverCount, shardCount] = await Promise.all([
        this.calculateServerCount(),
        Promise.resolve(this.shard?.count || 1),
      ]);

      const headerData = service.headerData || {};

      await lastValueFrom(
        from(service.actions).pipe(
          mergeMap((action) =>
            this.httpService.request({
              method: action.method || 'POST',
              url: action.url,
              data: replacePlaceholdersInObject(action.bodyData, { serverCount, shardCount }),
              headers: headerData,
              proxy: service.proxy || this.options.proxy,
            }),
          ),
        ),
      );

      this.logStats(service.name, serverCount, shardCount);
    } catch (err) {
      this.logErrors(service.name, err);
    }
  }

  private async calculateServerCount(): Promise<number> {
    if (this.shard) {
      const shardGuildSizes = (await this.shard.fetchClientValues('guilds.cache.size')) as number[];

      return (
        shardGuildSizes.reduce((acc, size) => acc + size, 0) || this.client.application?.approximateGuildCount || 0
      );
    }

    return this.client.guilds.cache.size;
  }

  private logStats(serviceName: string, serverCount: number, shardCount: number) {
    if (this.options.log ?? true) {
      this.logger.log(`Reporting stats for ${serviceName}, servers: ${serverCount}, shards: ${shardCount}`);
    }
  }

  private logErrors(serviceName: string, error: Error) {
    if (this.options.log ?? true) {
      this.logger.error(`Error reporting stats for ${serviceName}`, error);
    }
  }
}
