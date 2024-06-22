import { NotFoundException } from '@nestjs/common';

export class PaginationNotFoundException extends NotFoundException {
  public constructor() {
    super('Pagination builder not found');
  }
}
