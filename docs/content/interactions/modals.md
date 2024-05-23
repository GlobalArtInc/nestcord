---
id: modals

title: Modals

sidebar_position: 4
---

With modals you can create pop-up forms that allow users to provide you with formatted inputs through submissions. We'll cover how to create, show, and receive modal forms using nestcord

<img src="/img/content/modal.png" alt="Modal" width="500" />

```typescript title="app.modals.ts"
import { Injectable } from '@nestjs/common';
import { Context, Modal, ModalContext } from '@globalart/nestcord';

@Injectable()
export class AppModals {
    @Modal('pizza')
    public onModal(@Ctx() [interaction]: ModalContext) {
      return interaction.reply({
        content: `Your fav pizza : ${interaction.fields.getTextInputValue('pizza')}`
      });
    }
}
```

### Dynamic Modal
You can create modals with dynamic `id` field. This is useful for passing metadata to modals.

Dynamic modals uses [path-to-regexp](https://www.npmjs.com/package/path-to-regexp) format to perform regexp matching. Turn a path string such as `user/:name` into a regular expression.

To create a Dynamic modal
```typescript
new ModalBuilder()
  .setTitle('What your fav pizza?')
  .setCustomId('pizza/12345')
  .setComponents([
    new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents([
      new TextInputBuilder()
        .setCustomId('pizza')
        .setLabel('???')
        .setStyle(TextInputStyle.Paragraph)
    ])
  ])
```

To receive a Dynamic modal
```typescript title="app.modals.ts"
import { Injectable } from '@nestjs/common';
import { Context, Modal, ModalContext,ModalParam } from '@globalart/nestcord';

@Injectable()
export class AppModals {
    @Modal('pizza/:value')
    public onModal(@Ctx() [interaction]: ModalContext, @ModalParam('value') value: string) {
      return interaction.reply({
        content: `Your fav pizza ${value} : ${interaction.fields.getTextInputValue('pizza')}`
      });
    }
}
```
