import { Inject, Injectable } from '@nestjs/common';
import { NestCordPaginationOptions } from './interfaces';
import { NESTCORD_PAGINATION_MODULE_OPTIONS } from './nestcord-pagination.module-definition';
import { PaginatorTypeEnum } from './enums';
import { ButtonsPaginationBuilder } from './builders/buttons-padgination.builder';
import { SelectMenuPaginationBuilder } from './builders/select-menu-pagination.builder';
import { PaginationBuilder } from './types/paginator-builder.type';

@Injectable()
export class NestCordPaginationService {
  private readonly cache = new Map<string, PaginationBuilder<PaginatorTypeEnum>>();

  public constructor(
    @Inject(NESTCORD_PAGINATION_MODULE_OPTIONS)
    private readonly options: NestCordPaginationOptions,
  ) {}

  public register(
    paginatorType: PaginatorTypeEnum,
    factory: (builder: PaginationBuilder<PaginatorTypeEnum>) => PaginationBuilder<PaginatorTypeEnum>,
  ): PaginationBuilder<PaginatorTypeEnum> {
    switch (paginatorType) {
      case PaginatorTypeEnum.BUTTONS: {
        const builder = factory(new ButtonsPaginationBuilder(this.options));
        this.cache.set(builder.customId, builder);

        return builder;
      }
      case PaginatorTypeEnum.SELECT_MENU: {
        const builder = factory(new SelectMenuPaginationBuilder(this.options));
        this.cache.set(builder.customId, builder);

        return builder;
      }
      default:
        throw new Error(`Unsupported paginator type: ${paginatorType}`);
    }
  }

  public get<T extends PaginatorTypeEnum>(customId: string): PaginationBuilder<T> | undefined {
    return this.cache.get(customId) as PaginationBuilder<T> | undefined;
  }

  public delete(customId: string): boolean {
    return this.cache.delete(customId);
  }
}
