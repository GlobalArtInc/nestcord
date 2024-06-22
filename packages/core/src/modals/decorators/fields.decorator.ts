import { createParamDecorator } from '@nestjs/common';
import { NestCordExecutionContext } from '../../context';

/**
 * Represents a fields param decorator.
 * @param customId The custom id.
 * @returns The fields param decorator.
 */
export const Fields = createParamDecorator((customId, context) => {
  const nestcordContext = NestCordExecutionContext.create(context);
  const [interaction] = nestcordContext.getContext<'interactionCreate'>();
  const discovery = nestcordContext.getDiscovery();

  if (!interaction.isModalSubmit() || !discovery.isModal()) {
    return null;
  }

  return customId ? interaction.fields.getTextInputValue(customId) : interaction.fields;
});
