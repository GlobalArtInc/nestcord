import { CommandContext, LocaleResolver } from '../interfaces';
import { ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { NestCordExecutionContext } from '../../core';

@Injectable()
export class UserResolver implements LocaleResolver {
  resolve(context: ExecutionContext): string | string[] | undefined {
    const nestcordContext = NestCordExecutionContext.create(context);
    const [interaction] = nestcordContext.getContext<CommandContext>();

    return interaction.locale;
  }
}
