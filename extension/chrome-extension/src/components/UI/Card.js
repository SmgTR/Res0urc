import React from 'react';
import defaultCover from '../../assets/defaultCover.png';

const Card = ({ pop }) => {
  const { name, description, id, links, cover } = pop;
  return (
    <li className='card'>
      <img
        className='card__cover'
        src={cover === '../assets/defaultCover.png' ? defaultCover : cover}
        alt='resourc cover'
      />
      <h1 className='card__title'>{name}</h1>
      <p className='card__description'>{description}</p>
      <p className='links-info'>Links: {links.length}/20</p>
    </li>
  );
};

export default Card;
