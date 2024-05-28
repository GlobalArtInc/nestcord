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
        NestCordPaginationModule.forRoot({
            // Change your buttons appearance
            buttons: {},
            // Add buttons for skip to first and last page
            allowSkip: true,
            // Add buttons for search page
            allowTraversal: true
        })
    ],
    providers: [AppService]
})
export class AppModule {}
```

Then, we can inject the `PaginationService` into our service and register a pagination handler:

```typescript
import { OnModuleInit, Injectable } from '@nestjs/common';
import { NestCordPaginationService, PageBuilder } from '@globalart/nestcord/pagination';
import { Context, SlashCommand, SlashCommandContext } from '@globalart/nestcord';

@Injectable()
export class AppService implements OnModuleInit {
    public constructor(private readonly paginationService: NestCordPaginationService) {
    }

    public onModuleInit(): void {
        return this.paginationService.register(builder =>
            builder
                // Required, need for search your builder
                .setCustomId('test')
                // First way to set pages
                .setPages([
                    new PageBuilder().setContent('Page 1'),
                    new PageBuilder().setContent('Page 2'),
                    new PageBuilder().setContent('Page 3'),
                    new PageBuilder().setContent('Page 4'),
                    new PageBuilder().setContent('Page 5')
                ])
                // Second way, you can manually set pages using `setPages` method
                .setPagesFactory(page => new PageBuilder().setContent(`Page ${page}`))
                // Optional, only if you want to use pages factory
                .setMaxPages(5)
        );
    }

    @SlashCommand({ name: 'pagination', description: 'Test pagination' })
    public async onPagination(@Context() [interaction]: SlashCommandContext) {
        const pagination = this.paginationService.get('test');
        const page = await pagination.build();

        return interaction.reply(page);
    }
}
```

Congratulations! You have successfully created your first pagination!
Just use `pagination` command and you will see your pagination!
