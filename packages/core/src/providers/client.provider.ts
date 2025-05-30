import { Provider } from '@nestjs/common';
import { Client } from 'discord.js';
import { NestCordModuleOptions } from '../nestcord-options.interface';
import { NESTCORD_MODULE_OPTIONS } from '../nestcord.module-definition';

export const ClientProvider: Provider<Client> = {
  provide: Client,
  useFactory: (options: NestCordModuleOptions) => {
    const clientOptions = { ...options };

    if (options.proxyPath) {
      process.env.HTTPS_PROXY = options.proxyPath;
      process.env.HTTP_PROXY = options.proxyPath;
    } else if (options.proxy) {
      const { host, port, auth, protocol = 'http' } = options.proxy;
      const authString = auth ? `${auth.username}:${auth.password}@` : '';
      const proxyUrl = `${protocol}://${authString}${host}:${port}`;

      process.env.HTTPS_PROXY = proxyUrl;
      process.env.HTTP_PROXY = proxyUrl;
    }

    delete clientOptions.proxyPath;
    delete clientOptions.proxy;

    return new Client(clientOptions);
  },
  inject: [NESTCORD_MODULE_OPTIONS],
};
