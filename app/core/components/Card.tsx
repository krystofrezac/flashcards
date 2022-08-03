import React from 'react';
import { CardActionsProps, CardProps, CardTitleProps } from './Card.types';

const Card: React.FC<CardProps> = props => (
  <div className="card w-96 bg-base-100 shadow-xl">
    <div className="card-body">{props.children}</div>
  </div>
);

export const CardTitle: React.FC<CardTitleProps> = props => (
  <h2 className="card-title">{props.children}</h2>
);

export const CardActions: React.FC<CardActionsProps> = props => (
  <div className="card-actions justify-end">{props.children}</div>
);

export default Card;
