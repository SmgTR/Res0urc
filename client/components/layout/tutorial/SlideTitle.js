import React, { Fragment } from 'react';

const SlideTitle = ({ title }) => {
  return (
    <Fragment>
      <h1 className='tutorial__hint'>{title}</h1>
    </Fragment>
  );
};

export default SlideTitle;
