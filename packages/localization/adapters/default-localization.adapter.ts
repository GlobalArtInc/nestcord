import { replacePlaceholdersInString } from '@globalart/text-utils';
import { BaseLocalizationAdapter } from './base-localization.adapter';
import { LocalizationInterceptor } from '../interceptors';

interface DefaultLocalizationAdapterOptions {
  fallbackLocale?: string;
  locales?: Record<string, Record<string, string>>;
}

export class DefaultLocalizationAdapter extends BaseLocalizationAdapter<DefaultLocalizationAdapterOptions> {
  public getTranslation(key: string, locale: string, placeholders?: Record<string, string>): string {
    const translation = this.getTranslations(locale)[key] || this.getFallbackTranslation(key);

    return placeholders ? replacePlaceholdersInString(translation, placeholders) : translation;
  }

  public translate(key: string, placeholders?: Record<string, string>): string {
    const currentTranslationFn = LocalizationInterceptor.getCurrentTranslationFn();

    return currentTranslationFn
      ? currentTranslationFn(key, placeholders)
      : this.getTranslation(key, this.options.fallbackLocale, placeholders);
  }

  private getTranslations(locale: string): Record<string, string> {
    return this.options?.locales?.[locale] || {};
  }

  private getFallbackTranslation(key: string): string {
    const fallbackLocale = this.options?.fallbackLocale || 'en-US';

    return this.getTranslations(fallbackLocale)[key] || key;
  }
}
