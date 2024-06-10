import { ParamsFactory } from '@nestjs/core/helpers/external-context-creator';
import { NestCordParamType } from './nestcord-paramtype.enum';
import { NestCordBaseDiscovery } from '.';
import { ParamData } from '@nestjs/common';

export class NestCordParamsFactory implements ParamsFactory {
  public exchangeKeyForValue(type: number, data: ParamData, args: [Array<unknown>, NestCordBaseDiscovery]) {
    if (!args) {
      return null;
    }

    switch (type as NestCordParamType) {
      case NestCordParamType.CONTEXT:
        return args[0];
      case NestCordParamType.DISCOVERY:
        return args[1];
      default:
        return null;
    }
  }
}
