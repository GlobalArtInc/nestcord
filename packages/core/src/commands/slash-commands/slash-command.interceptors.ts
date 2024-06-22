import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { NestCordExecutionContext, SlashCommandContext } from '../../context';

@Injectable()
export class DeferCommandInterceptor implements NestInterceptor {
  public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<unknown>> {
    const nestcordContext = NestCordExecutionContext.create(context);
    const [interaction] = nestcordContext.getContext<SlashCommandContext>();
    const discovery = nestcordContext.getDiscovery();
    if (!discovery.isSlashCommand() && !discovery.isMessageComponent()) {
      return next.handle();
    }
    await interaction.deferReply();

    return next.handle();
  }
}
