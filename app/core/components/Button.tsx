import React from 'react';
import { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';

const getButtonVariantClass = (variant?: ButtonVariant): string => {
  if (!variant) return '';

  const variants: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    accent: 'btn-accent',
    info: 'btn-info',
    success: 'btn-success',
    warning: 'btn-warning',
    error: 'btn-error',
    ghost: 'btn-ghost',
    link: 'btn-link',
  };

  return variants[variant];
};

const getButtonSizeClass = (size?: ButtonSize): string => {
  if (!size) return '';

  const sizes: Record<ButtonSize, string> = {
    xs: 'btn-xs',
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
  };

  return sizes[size];
};

const Button: React.FC<ButtonProps> = props => {
  const simple = props.simple === true;

  const classes = [
    !simple && 'btn',
    props.className,
    !simple && getButtonSizeClass(props.size),
    !simple && getButtonVariantClass(props.variant),
  ]
    .filter(i => i)
    .join(' ');

  return React.createElement(
    props.element ?? 'button',
    { className: classes, onClick: props.onClick },
    props.children,
  );
};

export default Button;
