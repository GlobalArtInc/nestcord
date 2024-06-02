import { replacePlaceholdersInObjectWithFlatten } from '@globalart/text-utils';
import { BaseLocalizationAdapter } from './base-localization.adapter';
import { LocalizationInterceptor } from '../interceptors';

interface TranslationData {
  [key: string]: string | TranslationData;
}

interface NestedLocalizationAdapterOptions {
  fallbackLocale?: string;
  locales?: Record<string, TranslationData>;
}

export class NestedLocalizationAdapter extends BaseLocalizationAdapter<NestedLocalizationAdapterOptions> {
  public getTranslation(key: string, locale: string, placeholders?: Record<string, string>): string {
    const translations = this.getTranslations(locale);
    const translation = this.findTranslation(translations, key) || this.getFallbackTranslation(key);

    return replacePlaceholdersInObjectWithFlatten(translation, placeholders);
  }

  public translate(key: string, placeholders?: Record<string, string>): string {
    const currentTranslationFn = LocalizationInterceptor.getCurrentTranslationFn();

    return currentTranslationFn
      ? currentTranslationFn(key, placeholders)
      : this.getTranslation(key, this.options.fallbackLocale, placeholders);
  }

  private getTranslations(locale: string): TranslationData {
    return this.options?.locales?.[locale] || {};
  }

  private findTranslation(translations: TranslationData, key: string): string | undefined {
    const keys = key.split('.');
    let currentTranslation: string | TranslationData | undefined = translations;

    for (const k of keys) {
      if (!(typeof currentTranslation === 'object' && k in currentTranslation)) {
        return undefined;
      }

      currentTranslation = currentTranslation[k];
    }

    return typeof currentTranslation === 'string' ? currentTranslation : undefined;
  }

  private getFallbackTranslation(key: string): string {
    const fallbackLocale = this.options?.fallbackLocale || 'en-US';
    const translations = this.getTranslations(fallbackLocale);

    return this.findTranslation(translations, key) || key;
  }
}
