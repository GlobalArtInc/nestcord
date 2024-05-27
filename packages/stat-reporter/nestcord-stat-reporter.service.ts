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
    this.client.on('ready', () => {
      this.setupCronJobs();
    });
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
    await this.client.application.fetch();
    const serverCount = this.client.guilds.cache.size;
    const shardCount = this.client.shard?.count || 1;
    const bodyData = this.replacePlaceholders(service.bodyData, { serverCount, shardCount });

    this.httpService
      .request({
        method: service.method || 'POST',
        url: service.url,
        data: bodyData,
      })
      .subscribe({
        next: () => {
          this.logger.log(`Reporting stats for ${service.name}, servers: ${serverCount}, shards: ${shardCount}`);
        },
        error: (err) => {
          this.logger.error(`Error reporting stats for ${service.name}`, err);
        },
      });
  }

  private replacePlaceholders(obj: unknown, replacements: unknown) {
    if (typeof obj === 'string') {
      return obj.replace(/{{(.*?)}}/g, (_, key) => replacements[key]);
    }
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        obj[key] = this.replacePlaceholders(obj[key], replacements);
      }
    }

    return obj;
  }
}
