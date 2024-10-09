import { Injectable } from '@nestjs/common';
import { AutocompleteInteraction } from 'discord.js';
import { DefaultSources } from 'lavalink-client';
import { AutocompleteInterceptor } from '../../../packages';

@Injectable()
export class SourceAutocompleteInterceptor extends AutocompleteInterceptor {
  public transformOptions(interaction: AutocompleteInteraction) {
    const focused = interaction.options.getFocused(true);
    let choices: string[];

    if (focused.name === 'source') {
      choices = [DefaultSources.soundcloud]; // Note that some Sources needs extra plugins/configuration to property work
    }

    return interaction.respond(
      choices
        .filter((choice) => choice.startsWith(focused.value.toString()))
        .map((choice) => ({ name: choice, value: choice })),
    );
  }
}
