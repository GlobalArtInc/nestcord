import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Message, PermissionResolvable } from 'discord.js';
import { AnyContext, NestCordExecutionContext } from '../context';
import { PERMISSIONS_METADATA_KEY } from './permissions.decorator';
import { InsufficientPermissionsException } from './permissions.exception';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const permissions = this.reflector.getAllAndOverride<PermissionResolvable[]>(PERMISSIONS_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!permissions?.length) return true;

    const nestcordContext = NestCordExecutionContext.create(context);
    const [interaction] = nestcordContext.getContext<AnyContext>();

    const has =
      interaction instanceof Message
        ? (interaction.member?.permissions?.has(permissions) ?? false)
        : (('memberPermissions' in interaction && interaction.memberPermissions?.has(permissions)) ?? false);

    if (!has) throw new InsufficientPermissionsException(permissions);

    return true;
  }
}
