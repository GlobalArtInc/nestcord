import { Method, RawAxiosRequestHeaders } from 'axios';
import { StatCronExpression } from '../enums';

export interface ServiceOption {
  /**
   * Stat service name
   * @returns string
   */
  name: string;

  /**
   * Stat service api url to send the body data
   * @returns string;
   */
  url: string;

  /**
   * Stat service request method
   * @returns RequestMethod
   */
  method?: Method;

  /**
   *  Stat service body data
   *  @returns Record<string, unknown>
   */
  bodyData: Record<string, unknown>;

  /**
   *  Stat service header data
   *  @returns Record<string, unknown>
   */
  headerData?: RawAxiosRequestHeaders;

  /**
   * Crontab expression
   * @returns StatCronExpression
   * @returns string
   */
  schedule?: StatCronExpression | string;
}

export interface NestCordStatReporterOptions {
  services: ServiceOption[];
  /**
   * If true skip all jobs
   */
  development?: boolean;

  /**
   * Show log
   * @returns boolean
   */
  log?: boolean;
}
