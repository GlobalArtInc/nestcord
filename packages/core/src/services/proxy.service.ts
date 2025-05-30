import { Injectable, Logger } from '@nestjs/common';
import { NestCordModuleOptions } from '../nestcord-options.interface';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);
  private proxyConfig?: string | { host: string; port: number; auth?: { username: string; password: string } };

  configure(options: NestCordModuleOptions): void {
    if (options.proxyPath) {
      this.setupProxyPath(options.proxyPath);
    } else if (options.proxy) {
      this.setupProxyObject(options.proxy);
    }
  }

  getConfig() {
    return this.proxyConfig;
  }

  private setupProxyPath(proxyPath: string): void {
    this.proxyConfig = proxyPath;
    const maskedPath = this.maskProxyUrl(proxyPath);
    this.logger.log(`Proxy path configured: ${maskedPath}`);
    this.setEnvVariables(proxyPath);
  }

  private setupProxyObject(proxy: NestCordModuleOptions['proxy']): void {
    if (!proxy) return;

    const { host, port, auth, protocol = 'http' } = proxy;
    const authString = auth ? `${auth.username}:${auth.password}@` : '';
    const proxyUrl = `${protocol}://${authString}${host}:${port}`;

    this.proxyConfig = proxy;
    const maskedHost = this.maskString(host);
    this.logger.log(`Proxy configured: ${protocol}://${maskedHost}:${port}`);
    this.setEnvVariables(proxyUrl);
  }

  private setEnvVariables(proxyUrl: string): void {
    process.env.HTTPS_PROXY = proxyUrl;
    process.env.HTTP_PROXY = proxyUrl;
  }

  private maskProxyUrl(url: string): string {
    try {
      const proxyUrl = new URL(url);
      const maskedHost = this.maskString(proxyUrl.hostname);
      return `${proxyUrl.protocol}//${proxyUrl.username ? '****:****@' : ''}${maskedHost}:${proxyUrl.port}`;
    } catch {
      return '****';
    }
  }

  private maskString(str: string): string {
    if (!str) return '';
    const visibleChars = 2;
    const start = str.slice(0, visibleChars);
    return start + '*'.repeat(Math.max(str.length - visibleChars, 3));
  }
}
