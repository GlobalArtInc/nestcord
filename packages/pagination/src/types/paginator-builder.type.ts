import { ButtonsPaginationBuilder } from '../builders/buttons-padgination.builder';
import { SelectMenuPaginationBuilder } from '../builders/select-menu-pagination.builder';
import { PaginatorTypeEnum } from '../enums';

export type PaginationBuilder<T extends PaginatorTypeEnum> =
  T extends PaginatorTypeEnum.BUTTONS ? ButtonsPaginationBuilder :
  T extends PaginatorTypeEnum.SELECT_MENU ? SelectMenuPaginationBuilder :
  never;
