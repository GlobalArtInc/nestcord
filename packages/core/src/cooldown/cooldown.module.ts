import { Global, Module } from '@nestjs/common';
import { COOLDOWN_STORAGE } from './cooldown.constants';
import { CooldownGuard } from './cooldown.guard';
import { CooldownModuleOptions, CooldownStorageConfig } from './cooldown-module-options.interface';
import { CooldownConfigurableModule, COOLDOWN_MODULE_OPTIONS_TOKEN } from './cooldown.module-definition';
import { CooldownStorage } from './storages/cooldown-storage.interface';
import { FileCooldownStorage } from './storages/file-cooldown.storage';
import { MemoryCooldownStorage } from './storages/memory-cooldown.storage';
import { RedisCooldownStorage } from './storages/redis-cooldown.storage';

function createStorage(config: CooldownStorageConfig = { type: 'memory' }): CooldownStorage {
  switch (config.type) {
    case 'file':
      return new FileCooldownStorage(config.path);

    case 'redis': {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const Redis = require('ioredis');
      return new RedisCooldownStorage(new Redis(config.options ?? {}));
    }

    case 'memory':
    default:
      return new MemoryCooldownStorage();
  }
}

@Global()
@Module({
  providers: [
    {
      provide: COOLDOWN_STORAGE,
      useFactory: (options: CooldownModuleOptions) => createStorage(options.storage),
      inject: [COOLDOWN_MODULE_OPTIONS_TOKEN],
    },
    CooldownGuard,
  ],
  exports: [COOLDOWN_STORAGE, CooldownGuard],
})
export class NestCordCooldownModule extends CooldownConfigurableModule {}
