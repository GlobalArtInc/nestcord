import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AutocompleteContext, NestCordExecutionContext, SlashCommandContext } from '../../context';
import { AutocompleteInteraction } from 'discord.js';

/**
 * The defercommand interceptor.
 */
@Injectable()
export abstract class DeferCommandInterceptor implements NestInterceptor {
  public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const nestcordContext = NestCordExecutionContext.create(context);
    const [interaction] = nestcordContext.getContext<SlashCommandContext>();
    const discovery = nestcordContext.getDiscovery();
    if (!discovery.isSlashCommand()) return next.handle();
    
    return of(interaction.deferReply());
  }
}
