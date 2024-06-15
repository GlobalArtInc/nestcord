import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NestCordExecutionContext, TextCommandContext } from '../../context';

/**
 * Represents an arguments param decorator.
 * @returns The arguments param decorator.
 */
export const Arguments = createParamDecorator((_, context: ExecutionContext) => {
  const nestcordContext = NestCordExecutionContext.create(context);
  const [message] = nestcordContext.getContext<TextCommandContext>();
  const discovery = nestcordContext.getDiscovery();

  if (!discovery.isTextCommand()) {
    return null;
  }

  return message.content.split(/ +/g).slice(1);
});

export const Args = Arguments;
