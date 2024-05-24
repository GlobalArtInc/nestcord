import { NestCordParamType } from '../nestcord-paramtype.enum';
import { createNestCordParamDecorator } from './params.util';

/**
 * Context decorator that marks a argument as a context.
 * This decorator is used to retrieve the context.
 * @returns The decorated argument.
 */
export const Context = createNestCordParamDecorator(NestCordParamType.CONTEXT);

export const Ctx = Context;
