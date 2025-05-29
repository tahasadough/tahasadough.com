import { ReactNode } from 'react';

export interface CvaBaseComponentProps {
  variant?: variant;
  size?: size;
  color?: color;
  className?: string;
  children?: ReactNode;
}

export interface ScreenSize {
  width: number;
  height: number;
}

export interface Link {
  href: string;
  name: string;
}

export type ValueOf<T> = T[keyof T];

export type NestedValue<T> = { [K in keyof T]: ValueOf<T[K]> }[keyof T];

export type variant = 'default' | 'outline';

export type size = 'default' | 'sm' | 'lg';

export type color = 'default' | 'secondary';
