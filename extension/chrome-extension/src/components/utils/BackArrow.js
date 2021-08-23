import React, { useContext } from 'react';
import ResContext from '../context/resources/resContext';

const BackArrow = ({ section }) => {
  const resContext = useContext(ResContext);
  const { clearCurrent } = resContext;
  return (
    <div className='flex back'>
      <i className='fas fa-arrow-left back__arrow' onClick={clearCurrent}></i>
      <h4 className='back__title' onClick={clearCurrent}>
        {section}
      </h4>
    </div>
  );
};

export default BackArrow;
