import React, { useContext } from 'react';
import defaultCover from '../../assets/defaultCover.png';
import ResContext from '../context/resources/resContext';

const Card = ({ pop }) => {
  const { name, description, id, links, cover } = pop;

  const resContext = useContext(ResContext);

  const { getOnePublic } = resContext;

  const currentHandler = (e) => {
    const link = e.target.id || e.target.parentElement.id;

    getOnePublic(link);
  };

  return (
    <li className='card' id={id} onClick={currentHandler}>
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
