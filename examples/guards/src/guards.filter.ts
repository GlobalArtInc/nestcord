import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { NestCordArgumentsHost, SlashCommandContext } from '../../../packages/core';
import { CooldownException, InsufficientPermissionsException } from '../../../packages/core';
import { Message } from 'discord.js';

@Catch(CooldownException)
export class CooldownExceptionFilter implements ExceptionFilter {
  public catch(exception: CooldownException, host: ArgumentsHost) {
    const [interaction] = NestCordArgumentsHost.create(host).getContext<SlashCommandContext>();
    const text = `⏳ You're on cooldown. Try again in **${Math.ceil(exception.remainingMs / 1000 / 60)}m**.`;

    return interaction.reply({ content: text, ephemeral: true });
  }
}

@Catch(InsufficientPermissionsException)
export class PermissionsExceptionFilter implements ExceptionFilter {
  public catch(_exception: InsufficientPermissionsException, host: ArgumentsHost) {
    const [interaction] = NestCordArgumentsHost.create(host).getContext<SlashCommandContext>();

    return interaction.reply({ content: '🚫 You do not have permission to use this command.', ephemeral: true });
  }
}
