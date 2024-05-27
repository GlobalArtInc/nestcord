import { Injectable, Logger } from '@nestjs/common';
import { Once, Context, ContextOf } from '../../../packages';

@Injectable()
export class AppGateway {
  private readonly logger = new Logger(AppGateway.name);

  @Once('ready')
  onBotReady(@Context() [client]: ContextOf<'ready'>) {
    this.logger.log(`Bot logged in as ${client.user.username}`);
  }
}
