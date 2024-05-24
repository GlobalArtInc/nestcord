import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NestCordExecutionContext, SlashCommandContext } from '../../../context';
import { OPTIONS_METADATA } from './option.util';

/**
 * Options decorator that mark arguments as options.
 * This decorator is used to retrieve the options from a slash command.
 * @returns The decorated argument.
 */
export const Options = createParamDecorator(
  (_, context: ExecutionContext) => {
    const nestcordContext = NestCordExecutionContext.create(context);
    const [interaction] = nestcordContext.getContext<SlashCommandContext>();
    const discovery = nestcordContext.getDiscovery();

    if (!discovery.isSlashCommand()) return null;

    return Object.entries(discovery.getRawOptions()).reduce((acc, [parameter, option]) => {
      acc[parameter] = interaction.options[option.resolver].call(interaction.options, option.name, !!option.required);
      return acc;
    }, {});
  },
  [
    (target, propertyKey, parameterIndex) => {
      const paramTypes = Reflect.getMetadata('design:paramtypes', target, propertyKey);
      let { prototype } = paramTypes[parameterIndex];

      const options = {};

      do {
        const metadata = Reflect.getOwnMetadata(OPTIONS_METADATA, prototype);

        Object.assign(options, metadata);
      } while ((prototype = Reflect.getPrototypeOf(prototype)) && prototype !== Object.prototype);

      Reflect.defineMetadata(OPTIONS_METADATA, options, target[propertyKey]);
    },
  ],
);

export const Opts = Options;
