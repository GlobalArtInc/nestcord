import { Provider } from '@nestjs/common';
import { DeferCommandInterceptor } from './defer-command.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

export * from './defer-command.interceptor';

const INTERCEPTORS_PROVIDEDERS = [DeferCommandInterceptor];

export const APP_INTERCEPTOR_PROVIDERS: Provider[] = INTERCEPTORS_PROVIDEDERS.map((useClass) => ({
  provide: APP_INTERCEPTOR,
  useClass,
}));
