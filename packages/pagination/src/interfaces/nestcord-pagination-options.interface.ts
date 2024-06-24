import { ButtonStyle } from 'discord.js';
import { PaginationAction } from '../enums';

export interface ButtonAppearance {
  style: ButtonStyle;
  label: string;
  emoji?: string;
  customId?: string;
  disabled?: boolean;
  link?: string;
  options?: string;
}

export interface MenuAppearance {
  label: string;
  value: string;
  description?: string;
  emoji?: string;
  default?: boolean;
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
  // todo... add some options
}
