export abstract class BaseLocalizationAdapter<Options = unknown> {
  public constructor(protected readonly options?: Options) {}

  public abstract getTranslation(key: string, locale: string, ...args: unknown[]): string;
  public abstract translate(key: string, ...args: unknown[]): string;
}
