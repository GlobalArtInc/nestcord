import { ForbiddenException } from '@nestjs/common';

export class PaginationForbiddenException extends ForbiddenException {
	public constructor() {
		super('Pagination forbidden');
	}
}
