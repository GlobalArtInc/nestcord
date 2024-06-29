import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor, OnModuleInit, Type } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NestCordContextType, NestCordExecutionContext } from '../../../core';
import { LOCALIZATION_ADAPTER, LOCALIZATION_RESOLVERS } from '../providers';
import { BaseLocalizationAdapter } from '../adapters';
import { LocaleResolver, TranslationFn } from '../interfaces';
import { ModuleRef } from '@nestjs/core';

@Injectable()
export class LocalizationInterceptor implements NestInterceptor, OnModuleInit {
  private cachedResolvers: LocaleResolver[];
  private static currentTranslationFn: TranslationFn = null;

  public static getCurrentTranslationFn(): TranslationFn {
    return LocalizationInterceptor.currentTranslationFn;
  }

  public constructor(
    @Inject(LOCALIZATION_ADAPTER)
    private readonly localizationAdapter: BaseLocalizationAdapter,
    @Inject(LOCALIZATION_RESOLVERS)
    private readonly resolvers: (LocaleResolver | Type<LocaleResolver>)[],
    private readonly moduleRef: ModuleRef,
  ) {}

  public async onModuleInit(): Promise<void> {
    this.cachedResolvers = await Promise.all(this.resolvers.map((r) => this.getResolver(r)));
  }

  public async intercept(context: ExecutionContext, next: CallHandler<unknown>): Promise<Observable<unknown>> {
    if (context.getType<NestCordContextType>() !== 'nestcord') {
      return next.handle();
    }

    const nestcordContext = NestCordExecutionContext.create(context);
    const discovery = nestcordContext.getDiscovery();

    const isNotSpecialCase =
      !discovery.isSlashCommand() &&
      !discovery.isContextMenu() &&
      !discovery.isListener() &&
      !discovery.isMessageComponent();

    if (isNotSpecialCase) {
      return next.handle();
    }

    const locale = await this.getLocale(nestcordContext);
    const translationFn = this.getTranslationFn(locale);
    LocalizationInterceptor.currentTranslationFn = translationFn;

    return next.handle();
  }

  private async getLocale(ctx: ExecutionContext): Promise<string> {
    let language = null;

    for (const resolver of this.cachedResolvers) {
      language = resolver.resolve(ctx);

      if (language instanceof Promise) {
        language = await (language as Promise<string>);
      }

      if (language !== undefined) {
        break;
      }
    }

    return Array.isArray(language) ? language[0] : language;
  }

  private async getResolver(resolver: LocaleResolver | Type<LocaleResolver>): Promise<LocaleResolver> {
    if (resolver instanceof Function) {
      try {
        return this.moduleRef.get(resolver, { strict: false });
      } catch (e) {
        return this.moduleRef.create(resolver);
      }
    }

    return resolver;
  }

  private getTranslationFn(locale: string): TranslationFn {
    return (key: string, ...args: unknown[]) => {
      return this.localizationAdapter.getTranslation(key, locale, ...args);
    };
  }
}
