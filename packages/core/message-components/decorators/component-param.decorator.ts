import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NestCordExecutionContext } from '../../context';

/**
 * Represents a component param decorator.
 * @param data The data.
 * @returns The component param decorator.
 */
export const ComponentParam = createParamDecorator((data, ctx: ExecutionContext) => {
  const nestcordContext = NestCordExecutionContext.create(ctx);
  const [interaction] = nestcordContext.getContext<'interactionCreate'>();
  const discovery = nestcordContext.getDiscovery();

  if (!discovery.isMessageComponent() || !interaction.isMessageComponent()) return null;

  const match = discovery.matcher([interaction.componentType, interaction.customId].join('_'));

  if (!match) return null;

  return data ? match.params[data] : match.params;
});
