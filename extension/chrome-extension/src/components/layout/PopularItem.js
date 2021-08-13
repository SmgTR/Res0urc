import React from 'react';
import Card from '../UI/Card';

const PopularItem = ({ popular }) => {
  return (
    <ul className='res__grid'>
      {popular.map((popLink) => {
        return <Card pop={popLink} />;
      })}
    </ul>
  );
};

export default PopularItem;
