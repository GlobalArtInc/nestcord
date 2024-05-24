export abstract class BaseLocalizationAdapter<Options = any> {
  public constructor(protected readonly options?: Options) {}

  public abstract getTranslation(key: string, locale: string, ...args: any[]): string;
}
