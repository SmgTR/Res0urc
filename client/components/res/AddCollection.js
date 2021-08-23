import React from 'react';

const AddCollection = ({ show, hide }) => {
  return (
    <i
      onClick={() => {
        show(true);
        hide(false);
      }}
      className='fas fa-plus new__res'
    />
  );
};

export default AddCollection;
