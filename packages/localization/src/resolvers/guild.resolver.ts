import { CommandContext, LocaleResolver } from '../interfaces';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { NestCordExecutionContext } from '../../../core';

@Injectable()
export class GuildResolver implements LocaleResolver {
  resolve(context: ExecutionContext): string | string[] | undefined {
    const nestcordContext = NestCordExecutionContext.create(context);
    const { interaction } = nestcordContext.getContext<CommandContext>();

    return interaction.guildLocale;
  }
}
