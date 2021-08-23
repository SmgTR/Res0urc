import React from 'react';
import Card from '../UI/Card';

const ResItem = ({ res }) => {
  return (
    <ul className='res__grid'>
      {res.map((resLink) => {
        return <Card pop={resLink} key={resLink.id} id={resLink.id} />;
      })}
    </ul>
  );
};

export default ResItem;
