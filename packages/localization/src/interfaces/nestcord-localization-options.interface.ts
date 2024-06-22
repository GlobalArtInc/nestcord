import { BaseLocalizationAdapter } from '../adapters';
import { Type } from '@nestjs/common';
import { LocaleResolver } from './locale-resolver.interface';

export type NestCordLocalizationResolvers =
  | (LocaleResolver | Type<LocaleResolver>)[]
  | Type<LocaleResolver>
  | LocaleResolver;

export interface NestCordLocalizationOptions {
  adapter: BaseLocalizationAdapter;
  resolvers: NestCordLocalizationResolvers;
}
