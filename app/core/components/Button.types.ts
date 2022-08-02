import React from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost'
  | 'link';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  element?: React.ElementType;

  variant?: ButtonVariant;
  size?: ButtonSize;
  /** If btn classes should not be applied */
  simple?: boolean;

  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
