import React, { useState } from 'react';

const Link = ({ link, removeSelect, addSelect }) => {
  const [borderSelected, setBorderSelected] = useState(false);
  const { description, title, image, type, url, video, _id } = link;

  const select = (e) => {
    const key = window.navigator.platform.toLowerCase().includes('mac')
      ? e.metaKey
      : e.altKey;
    if (key) {
      setBorderSelected(!borderSelected);

      const itemId = e.target_id;

      borderSelected ? removeSelect(itemId) : addSelect({ id: itemId, url });
    }
  };

  return (
    <div
      className={`link__item ${borderSelected ? 'selected' : ''}`}
      onClick={select}
    >
      <img src={link.image} alt='user avatar' />
      <h1>{link.title}</h1>
      <p>{link.description}</p>
      <div className='link-url'>
        <a
          href={link.url}
          target='_blank'
          rel='noreferrer'
          className='open__link'
        >
          Open
        </a>
      </div>
    </div>
  );
};

export default Link;
