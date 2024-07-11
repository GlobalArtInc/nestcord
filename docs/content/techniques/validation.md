---
id: validation

title: Validation

sidebar_position: 0
---

The `ValidationPipe` is a built-in pipe that can be used to validate data coming from the client. It uses [class-validator](https://github.com/typestack/class-validator) package under the hood. The `ValidationPipe` provides a convenient approach to enforce validation rules for all incoming client payloads, where the specific rules are declared with simple annotations in DTO declarations in each module.

## Installation

```bash npm2yarn
$ npm install class-validator class-transformer
```

## Usage

Now we can add a few validation rules in our `CreateUserDto`. We do this using decorators provided by the class-validator package, described in detail [here](https://github.com/typestack/class-validator#validation-decorators). In this fashion, any route that uses the `CreateUserDto` will automatically enforce these validation rules.

```typescript title="src/users/dto/create-user.dto.ts"
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
    @StringOption({
        name: 'name',
        description: 'Your name',
        required: true
    })
    name: string;

    @IsEmail()
    @StringOption({
        name: 'text',
        description: 'Your email',
        required: false
    })
    email: string;
}
```

:::tip
Also you can use `ValidationPipe` for transforming and validating the payload of a request.

[Read more about transforming](https://docs.nestjs.com/techniques/validation#transform-payload-objects)
:::

Now, we can use the `ValidationPipe` in our `UsersCommands` to enforce the validation rules we just defined.

```typescript title="src/users/users.commands.ts"
import { Injectable } from '@nestjs/common';
import { Context, SlashCommand, SlashCommandContext } from '@globalart/nestcord';

@Injectable()
export class UsersCommands {
    @SlashCommand({
        name: 'create',
        description: 'Create a new user'
    })
    public async onCreateUser(
        @Context() { interaction }: SlashCommandContext,
        @Options(new ValidationPipe({ validateCustomDecorators: true })) createUserDto: CreateUserDto
    ) {
        return interaction.reply({ content: `User created: ${createUserDto.name}` });
    }
}
```

Now, if we try to use the `create` command without providing a name or email, we will get an error message.

```bash
{"statusCode":400,"message":["email should not be empty"],"error":"Bad Request"}
```

You can create snippet for validated options decorator:

```typescript title="src/decorators/validated-options.decorator.ts"
import { ValidationPipe, PipeTransform } from '@nestjs/common';

export const ValidatedOptions = (...dataOrPipes: PipeTransform[] | string) => {
    return Options(...dataOrPipes, new ValidationPipe());
};
```

:::tip
You can create filters to handle and response validation errors.

[See Exception Filters for more information](https://docs.nestjs.com/exception-filters#exception-filters)
:::
