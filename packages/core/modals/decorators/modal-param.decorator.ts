import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NestCordExecutionContext } from '../../context';

/**
 * Represents a modal param decorator.
 * @returns The modal param decorator.
 */
export const ModalParam = createParamDecorator((data, ctx: ExecutionContext) => {
	const nestcordContext = NestCordExecutionContext.create(ctx);
	const [interaction] = nestcordContext.getContext<'interactionCreate'>();
	const discovery = nestcordContext.getDiscovery();

	if (!discovery.isModal() || !interaction.isModalSubmit()) return null;

	const match = discovery.matcher(interaction.customId);

	if (!match) return null;

	return data ? match.params[data] : match.params;
});
