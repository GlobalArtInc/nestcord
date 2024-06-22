import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { ArgumentsHost } from '@nestjs/common';
import { NestCordContextType } from './nestcord-execution-context';
import { ClientEvents } from 'discord.js';
import { NestCordBaseDiscovery } from '.';
import { ContextOf } from './nestcord-context.interface';

export class NestCordArgumentsHost extends ExecutionContextHost {
  public static create(context: ArgumentsHost): NestCordArgumentsHost {
    const type = context.getType();
    const necContext = new NestCordArgumentsHost(context.getArgs());
    necContext.setType(type);
    return necContext;
  }

  public getType<TContext extends string = NestCordContextType>(): TContext {
    return super.getType();
  }

  public getContext<T extends keyof ClientEvents>(): ContextOf<T>;
  public getContext<T>(): T;
  public getContext<T extends keyof ClientEvents>(): ContextOf<T> {
    return this.getArgByIndex(0);
  }

  public getDiscovery(): NestCordBaseDiscovery {
    return this.getArgByIndex(1);
  }
}
