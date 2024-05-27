import { StringOption, localizationMapByKey } from '../../../packages';

export class AppDtos {
  @StringOption({
    name: 'name',
    description: 'name',
    required: true,
    name_localizations: localizationMapByKey('commands.options.name'),
    description_localizations: localizationMapByKey('commands.options.desc'),
    choices: [
      { name: 'first', name_localizations: localizationMapByKey('commands.options.first.name'), value: 'first' },
    ],
  })
  mission: string;
}
