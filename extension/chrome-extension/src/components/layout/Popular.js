import React, { useContext, useEffect } from 'react';
import ResContext from '../context/resources/resContext';
import ResItem from './ResItem';

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
    <div className='popular container-pd'>
      <h1 className='popular__title'>Recently popular:</h1>

      <ResItem res={sorted} />
    </div>
  );
};

export default Popular;
