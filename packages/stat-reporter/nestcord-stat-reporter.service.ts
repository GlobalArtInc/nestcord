import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client } from 'discord.js';
import { MODULE_OPTIONS_TOKEN } from './nestcord-stat-reporter.module-definition';
import { NestCordStatReporterOptions, ServiceOption } from './interfaces';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class NestCordStatReporterService implements OnModuleInit {
  private readonly logger = new Logger(NestCordStatReporterService.name);

  constructor(
    private readonly client: Client,
    @Inject(MODULE_OPTIONS_TOKEN) private readonly options: NestCordStatReporterOptions,
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
    return (this.client.shard?.ids?.[0] === 0) || !this.client.shard;
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
    await this.client.application?.fetch();
    const serverCount = await this.calculateServerCount();
    const shardCount = this.client.shard?.count || 1;
    const bodyData = this.replacePlaceholders(service.bodyData, { serverCount, shardCount });
    const headerData = service.headerData || {};

    this.httpService
      .request({
        method: service.method || 'POST',
        url: service.url,
        data: bodyData,
        headers: headerData,
      })
      .subscribe({
        next: () => this.logStats(service.name, serverCount, shardCount),
        error: (err) => this.logger.error(`Error reporting stats for ${service.name}`, err),
      });
  }

  private async calculateServerCount(): Promise<number> {
    if (this.client.shard) {
      const shardGuildSizes = await this.client.shard.fetchClientValues('guilds.cache.size') as number[];
      return shardGuildSizes.reduce((acc, size) => acc + size, 0) || this.client.application?.approximateGuildCount || 0;
    }
    return this.client.guilds.cache.size;
  }

  private logStats(serviceName: string, serverCount: number, shardCount: number) {
    if (this.options.log ?? true) {
      this.logger.log(`Reporting stats for ${serviceName}, servers: ${serverCount}, shards: ${shardCount}`);
    }
  }

  private replacePlaceholders(obj: any, replacements: { [key: string]: any }): any {
    if (typeof obj === 'string') {
      const val = obj.replace(/{{(.*?)}}/g, (_, key) => replacements[key] ?? _);
      
      return !isNaN(parseFloat(val)) ? Number(val) : val;      
    }
    if (obj && typeof obj === 'object') {
      Object.entries(obj).forEach(([key, value]) => {
        obj[key] = this.replacePlaceholders(value, replacements);
      });
    }
    return obj;
  }
}
