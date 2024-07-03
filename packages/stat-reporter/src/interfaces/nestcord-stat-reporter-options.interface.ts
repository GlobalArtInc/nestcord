import { AxiosProxyConfig, Method, RawAxiosRequestHeaders } from 'axios';
import { StatCronExpression } from '../enums';

export interface ServiceOption {
  /**
   * The name of the stat service.
   */
  name: string;

  /**
   * The API URL of the stat service where the body data will be sent.
   */
  url: string;

  /**
   * The HTTP request method to use for the stat service.
   */
  method?: Method;

  /**
   * The body data to send to the stat service.
   */
  bodyData: Record<string, unknown>;

  /**
   * The header data to include in the request to the stat service.
   */
  headerData?: RawAxiosRequestHeaders;

  /**
   * The crontab expression that defines the schedule for the stat service.
   */
  schedule?: StatCronExpression | string;

  /**
   * Proxy config.
   */
  proxy?: AxiosProxyConfig;
}

export interface NestCordStatReporterOptions {
  /**
   * The list of stat service options.
   */
  services: ServiceOption[];

  /**
   * Proxy config.
   */
  proxy?: AxiosProxyConfig;

  /**
   * If true, skip all jobs.
   */
  development?: boolean;

  /**
   * If true, enable logging.
   */
  log?: boolean;
}
