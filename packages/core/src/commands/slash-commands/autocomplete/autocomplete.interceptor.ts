import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { AutocompleteContext, NestCordExecutionContext } from '../../../context';
import { AutocompleteInteraction } from 'discord.js';

/**
 * The autocomplete interceptor.
 * @see AutocompleteContext
 * @see AutocompleteInteraction
 */
@Injectable()
export abstract class AutocompleteInterceptor implements NestInterceptor {
  public abstract transformOptions(interaction: AutocompleteInteraction): void | Promise<void>;

  public async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<void | Promise<void>>> {
    const nestcordContext = NestCordExecutionContext.create(context);
    const [interaction] = nestcordContext.getContext<AutocompleteContext>();
    const discovery = nestcordContext.getDiscovery();

    if (!interaction.isAutocomplete() || !discovery.isSlashCommand()) {
      return next.handle();
    }

    return of(this.transformOptions(interaction));
  }
}
