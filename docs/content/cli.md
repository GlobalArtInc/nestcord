---
id: cli

slug: cli

title: CLI

description: NestCord Schematics is a tool that helps you to create your bot faster and easier.

sidebar_position: 6
---

The [NestCord Schematics](https://www.npmjs.com/package/@globalart/nestcord) is a collection of schematics that helps you to initialize, develop,
and maintain your NestCord applications. It embodies best-practice architectural patterns to encourage
well-structured apps.

## Installation

To install the schematics, run the following command:

```bash npm2yarn
npm install -g @nestjs/cli
npm install -D @globalart/nestcord
```

## Usage

### Generating commands

To generate a slash command you can use the command schematic:

```bash
nest g -c @globalart/nestcord/schematics command 
```

from there the wizard will ask what the name of the command is and type of command.

The available options for this command are the following:

| Option         | Description                                              |
|----------------|----------------------------------------------------------|
| `--name`       | The name of the command.                                 |
| `--path`       | The path to create the service.                          |
| `--flat`       | Whether or not a directory is created. (default: false)  |
| `--sourceRoot` | NestJS service source root directory.                    |
| `--spec`       | Whether or not a spec file is generated. (default: true) |
| `--strategy`       | The type of command. (text-command or slash-command)     |

### Generating message components

To generate a component you can use the component schematic:

```bash
nest g -c @globalart/nestcord/schematics component 
```

from there the wizard will ask what the name of the component is and type of component.

The available options for this command are the following:

| Option         | Description                                              |
|----------------|----------------------------------------------------------|
| `--name`       | The name of the component.                               |
| `--path`       | The path to create the service.                          |
| `--flat`       | Whether or not a directory is created. (default: false)  |
| `--sourceRoot` | NestJS service source root directory.                    |
| `--spec`       | Whether or not a spec file is generated. (default: true) |
| `--strategy`       | The type of component. (button, select)                  |

### Generating context menus

To generate a context menu you can use the context menu schematic:

```bash
nest g -c @globalart/nestcord/schematics context-menu 
```

from there the wizard will ask what the name of the context menu is and type of context menu.

The available options for this command are the following:

| Option         | Description                                              |
|----------------|----------------------------------------------------------|
| `--name`       | The name of the context menu.                            |
| `--path`       | The path to create the service.                          |
| `--flat`       | Whether or not a directory is created. (default: false)  |
| `--sourceRoot` | NestJS service source root directory.                    |
| `--spec`       | Whether or not a spec file is generated. (default: true) |
| `--strategy`       | The type of context menu. (user, message)                |

### Generating modal components

To generate a modal component you can use the modal schematic:

```bash
nest g -c @globalart/nestcord/schematics modal 
```
from there the wizard will ask what the name of the modal is and type of modal.

The available options for this command are the following:

| Option         | Description                                              |
|----------------|----------------------------------------------------------|
| `--name`       | The name of the modal.                                   |
| `--path`       | The path to create the service.                          |
| `--flat`       | Whether or not a directory is created. (default: false)  |
| `--sourceRoot` | NestJS service source root directory.                    |
| `--strategy`       | Whether or not a spec file is generated. (default: true) |

