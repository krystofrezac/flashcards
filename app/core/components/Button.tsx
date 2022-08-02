import React from 'react';
import { ButtonProps, ButtonSize, ButtonVariant } from './Button.types';
import Spinner from './Spinner';

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
    'relative',
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
    <>
      <div
        className={`absolute w-full h-full bg-gray-900 rounded-lg bg-opacity-30 transition-opacity ${
          !props.loading && 'opacity-0'
        }`}
      />
      <Spinner
        className={`absolute ml-auto mr-auto mt-auto mb-auto transition-opacity ${
          props.loading ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {props.children}
    </>,
  );
};

export default Button;
