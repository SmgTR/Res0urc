import React, { Fragment } from 'react';

const Logo = ({ login }) => {
  return (
    <Fragment>
      <h1 onClick={login} class='logo'>
        ResourC
      </h1>
    </Fragment>
  );
};

export default Logo;
