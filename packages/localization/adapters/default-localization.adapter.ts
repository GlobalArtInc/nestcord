import { BaseLocalizationAdapter } from './base-localization.adapter';

interface DefaultLocalizationAdapterOptions {
  fallbackLocale?: string;
  locales?: Record<string, Record<string, string>>;
}

export class DefaultLocalizationAdapter extends BaseLocalizationAdapter<DefaultLocalizationAdapterOptions> {
  public getTranslation(key: string, locale: string, placeholders?: Record<string, string>): string {
    const translation = this.getTranslations(locale)[key] || this.getFallbackTranslation(key);

    return placeholders
      ? translation.replace(/{{\s*([^}\s]+)\s*}}/g, (_, placeholder) => placeholders[placeholder] || '')
      : translation;
  }

  private getTranslations(locale: string): Record<string, string> {
    return this.options?.locales?.[locale] || {};
  }

  private getFallbackTranslation(key: string): string {
    const fallbackLocale = this.options?.fallbackLocale || 'en-US';

    return this.getTranslations(fallbackLocale)[key] || key;
  }
}
