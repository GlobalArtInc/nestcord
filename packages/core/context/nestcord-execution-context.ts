import { ContextType, ExecutionContext } from '@nestjs/common';
import { NestCordArgumentsHost } from './nestcord-arguments-host';

export type NestCordContextType = 'nestcord' | ContextType;

export class NestCordExecutionContext extends NestCordArgumentsHost {
	public static create(context: ExecutionContext): NestCordExecutionContext {
		const type = context.getType();
		const necContext = new NestCordExecutionContext(
			context.getArgs(),
			context.getClass(),
			context.getHandler()
		);
		necContext.setType(type);
		return necContext;
	}
}
