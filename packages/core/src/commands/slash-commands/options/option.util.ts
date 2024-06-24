import { APIApplicationCommandOptionBase } from 'discord-api-types/payloads/v10/_interactions/_applicationCommands/_chatInput/base';
import { ApplicationCommandOptionType } from 'discord.js';
import { OptionMeta } from '../slash-command.discovery';
import 'reflect-metadata';

export const OPTIONS_METADATA = 'necstord:options_meta';

export function createOptionDecorator<T extends APIApplicationCommandOptionBase<ApplicationCommandOptionType>>(
  type: ApplicationCommandOptionType,
  resolver: OptionMeta['resolver'],
) {
  return (data: Omit<T, 'type'>): PropertyDecorator => {
    return (target: Record<string, OptionMeta>, propertyKey: string | symbol) => {
      let metadata: Record<string, OptionMeta> = Reflect.getOwnMetadata(OPTIONS_METADATA, target);

      if (!metadata) {
        metadata = {};
      }

      metadata[String(propertyKey)] = {
        ...data,
        type,
        resolver,
      };

      Reflect.defineMetadata(OPTIONS_METADATA, metadata, target);
    };
  };
}
