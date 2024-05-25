import { ButtonStyle } from 'discord.js';
import { PaginationAction } from '../enums';

export interface ButtonAppearance {
  style: ButtonStyle;
  label: string;
  emoji?: string;
  customId?: string;
  disabled?: boolean;
  link?: string;
}

export interface ModalAppearance {
  title?: string;
  label?: string;
  placeholder?: string;
}

export type ButtonsAppearance = {
  [key in PaginationAction]?: Partial<ButtonAppearance>;
};

export interface NestCordPaginationOptions {
  buttons?: ButtonsAppearance;
  modal?: ModalAppearance;
  allowSkip?: boolean;
  allowTraversal?: boolean;
}
