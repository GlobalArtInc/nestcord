import { ExecutionContext } from '@nestjs/common';

export interface LocaleResolver {
	resolve(
		context: ExecutionContext
	): Promise<string | string[] | undefined> | string | string[] | undefined;
}
