import { BaseLocalizationAdapter } from './base-localization.adapter';

interface DefaultLocalizationAdapterOptions {
  fallbackLocale?: string;
  locales?: Record<string, Record<string, string>>;
}

export class DefaultLocalizationAdapter extends BaseLocalizationAdapter<DefaultLocalizationAdapterOptions> {
  public getTranslation(key: string, locale: string, placeholders?: Record<string, string>): string {
    const translations = this.getTranslations(locale);
    const translation = translations[key] || this.getFallbackTranslation(key);

    return translation.replace(/{{\s*([^}\s]+)\s*}}/g, (_, placeholder) => placeholders[placeholder]);
  }

  private getTranslations(locale: string): Record<string, string> {
    return this.options?.locales?.[locale] || {};
  }

  private getFallbackTranslation(key: string): string {
    const fallbackLocale = this.options?.fallbackLocale || 'en-US';
    const translations = this.getTranslations(fallbackLocale);

    return translations[key] || key;
  }
}
