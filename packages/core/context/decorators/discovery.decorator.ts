import { NestCordParamType } from '../nestcord-paramtype.enum';
import { createNestCordParamDecorator } from './params.util';

/**
 * Context decorator that marks a argument as a discovery.
 * This decorator is used to retrieve the discovery.
 * @returns The decorated argument.
 */
export const Discovery = createNestCordParamDecorator(NestCordParamType.DISCOVERY);
