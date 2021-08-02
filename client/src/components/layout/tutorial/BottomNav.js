import React from 'react';

const BottomNav = ({ dotClick, arrowClick, checkDot }) => {
  return (
    <div className='flex'>
      <i
        className='fas fa-chevron-left'
        onClick={(e) => arrowClick(e, checkDot)}
      ></i>
      <div
        className='tutorial__navigation__dot active__dot'
        data-slide='0'
        onClick={dotClick}
      ></div>
      <div
        className='tutorial__navigation__dot'
        data-slide='1'
        onClick={dotClick}
      ></div>

      <i
        className='fas fa-chevron-right'
        onClick={(e) => arrowClick(e, checkDot)}
      ></i>
    </div>
  );
};

export default BottomNav;
