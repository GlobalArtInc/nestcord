---
id: pagination

title: Pagination

sidebar_position: 1
---

Certainly! Pagination is a useful technique employed in user interfaces to present large amounts of information in a structured and
manageable way. When dealing with substantial volumes of data, such as search results, articles, or product listings, presenting it all at
once can overwhelm users and lead to a poor user experience. Pagination allows you to divide the information into smaller, organized chunks,
enhancing user engagement and ease of navigation. This module allows you to create a pagination with a few lines of code.

## Usage

Once the installation process is complete, we can import the `NestCordPaginationModule` with your `NestCordModule` into the root `AppModule`:

```typescript
import { NestCordModule } from '@globalart/nestcord';
import { Module } from '@nestjs/common';
import { NestCordPaginationModule } from '@globalart/nestcord';
import { AppService } from './app.service';

@Module({
    imports: [
        NestCordModule.forRoot({
            token: 'DISCORD_BOT_TOKEN',
            intents: ['Guilds', 'GuildMessages', 'DirectMessages']
        }),
        NestCordPaginationModule.forRoot(null)
    ],
    providers: [AppService]
})
export class AppModule {}
```

Then, we can inject the `PaginationService` into our service and register a pagination handler:

### Buttons pagination
```typescript
import { OnModuleInit, Injectable } from '@nestjs/common';
import { NestCordPaginationService, PageBuilder } from '@globalart/nestcord/pagination';
import { Context, SlashCommand, PaginatorTypeEnum, SlashCommandContext } from '@globalart/nestcord';

@Injectable()
export class AppService implements OnModuleInit {
    public constructor(private readonly paginationService: NestCordPaginationService) {
    }

    public onModuleInit(): void {
        this.paginationService.register(PaginatorTypeEnum.BUTTONS, (builder) =>
            builder
              .setCustomId('test')
        
        );
    }

    @SlashCommand({ name: 'pagination', description: 'Test pagination' })
    public async onPagination(@Context() [interaction]: SlashCommandContext) {
        const pagination = this.paginationService.get<PaginatorTypeEnum.BUTTONS>('test');
        pagination.setButtons([
            [
              { 
                customId: 'page1',
                label: 'Page 1',
                style: ButtonStyle.Secondary,
              },
              { 
                customId: 'page2',
                label: 'Page 2',
                style: ButtonStyle.Secondary,
              }
            ]
        ]);
        pagination.setPages([
          new PageBuilder().setContent('Page 1'),
          new PageBuilder().setContent('Page 2')
        ]);
        const page = await pagination.build(1);

        return interaction.reply(page);
    }
}
```

### Select Menu Pagination
```typescript
import { OnModuleInit, Injectable } from '@nestjs/common';
import { NestCordPaginationService, PageBuilder } from '@globalart/nestcord/pagination';
import { Context, SlashCommand, PaginatorTypeEnum, SlashCommandContext } from '@globalart/nestcord';

@Injectable()
export class AppService implements OnModuleInit {
    public constructor(private readonly paginationService: NestCordPaginationService) {
    }

    public onModuleInit(): void {
        this.paginationService.register(PaginatorTypeEnum.SELECT_MENU, (builder) =>
            builder
              .setCustomId('test')
        
        );
    }

    @SlashCommand({ name: 'pagination', description: 'Test pagination' })
    public async onPagination(@Context() [interaction]: SlashCommandContext) {
        const pagination = this.paginationService.get<PaginatorTypeEnum.SELECT_MENU>('test');
        pagination.setSelectMenuItems(this.setMenuItems());
        pagination.setPages(this.setMenuPages());
        const page = await pagination.build('page1');

        return interaction.reply(page);
    }

    @StringSelect('nestcord-pagination/test')
    async MenusInteraction(@Context() [interaction]: ButtonContext, @SelectedStrings() selected: string[]) {
      const selectedPage = selected?.[0] || null;
      const pagination = this.paginationService.get<PaginatorTypeEnum.SELECT_MENU>('menus');
      pagination.setSelectMenuItems(this.setMenuItems());
      pagination.setPages(this.setMenuPages());
      const page = await pagination.build(selectedPage);

      await interaction.update(page);
    }

    private readonly setMenuPages() {
      return [
        {
          pageId: 'page1',
          builder: new PageBuilder().setContent('Page 1'),
        },
        {
          pageId: 'page2',
          builder: new PageBuilder().setContent('Page 2'),
        },
      ];
    }

    private readonly setMenuItems() {
      return [
        {
          label: 'Page 1',
          value: 'page1',
        },
        {
          label: 'Page 2',
          value: 'page2',
        },
      ]
    }
}
```

Congratulations! You have successfully created your first pagination!
Just use `pagination` command and you will see your pagination!
