import React, { useContext } from 'react';
import ResContext from '../context/resources/resContext';
import Link from '../UI/Link';
import defaultAvatar from '../../assets/default.png';
import BackArrow from '../utils/BackArrow';

const Links = () => {
  const resContext = useContext(ResContext);

  const {
    current,
    getOnePublic,
    openSelected,
    openAll,
    selected,
    addSelect,
    removeSelect,
  } = resContext;
  const { name, author, links } = current;

  return (
    <div className='links container-pd'>
      <BackArrow section='Home' />
      <div className='links__top'>
        <h1 className='link__title'>{name}</h1>
        <div className='btn-container'>
          <div className='btn-rounded btn-open' onClick={openAll}>
            New Session
          </div>
          <div className='btn-rounded btn-open' onClick={openSelected}>
            New Session from selected
          </div>
        </div>
      </div>

      <p className='author__info'>
        Author: <img src={author.photo ? author.photo : defaultAvatar}></img>{' '}
        {author.name}
      </p>

      <section className='cards links-grid'>
        {links.map((link) => {
          return (
            <Link
              link={link}
              key={link._id}
              addSelect={addSelect}
              removeSelect={removeSelect}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Links;
