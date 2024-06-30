import { Injectable, Logger } from '@nestjs/common';
import { On } from '../../../packages';

@Injectable()
export class AppGateway {
  private readonly logger = new Logger(AppGateway.name);

  @On('ready')
  onReady() {
    this.logger.debug('ready emit');
  }
}
