import { BaseMessageOptions as PageOptions } from 'discord.js';

export class PageBuilder {
  private content: PageOptions['content'] = null;

  private embeds: PageOptions['embeds'] = [];

  private files: PageOptions['files'] = [];

  private components: PageOptions['components'] = [];

  public setContent(content: PageOptions['content']): this {
    this.content = content;
    return this;
  }

  public setEmbeds(embeds: PageOptions['embeds']): this {
    this.embeds = embeds;
    return this;
  }

  public addEmbed(embed: PageOptions['embeds'][0]): this {
    this.embeds = [embed]
    return this;
  }

  public setFiles(files: PageOptions['files']): this {
    this.files = files;
    return this;
  }

  public addFile(file: PageOptions['files'][0]): this {
    this.files = [file];
    return this;
  }

  public setComponents(components: PageOptions['components']): this {
    this.components = components;
    return this;
  }

  public build(): PageOptions {
    return {
      content: this.content,
      embeds: this.embeds,
      files: this.files,
      components: this.components,
    };
  }
}
