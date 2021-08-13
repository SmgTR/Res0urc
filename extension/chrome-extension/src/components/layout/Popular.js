import React, { useContext, useEffect, useCallback } from 'react';
import ResContext from '../context/resources/resContext';
import PopularItem from './PopularItem';

const Popular = () => {
  const resContext = useContext(ResContext);

  const { popular, getPopular } = resContext;

  useEffect(() => {
    getPopular();
  }, []);

  const sorted = popular.sort(
    (a, b) => b.addedToBookmark.length - a.addedToBookmark.length
  );

  return (
    <div className='popular'>
      <h1 className='popular__title'>Recently popular:</h1>

      <PopularItem popular={sorted} />
    </div>
  );
};

export default Popular;
