import React, { Fragment } from 'react';

const LinkEditDelete = ({ add, edit }) => {
  return (
    <Fragment>
      <p
        className='selected__options'
        onClick={() => {
          add();
          edit(true);
        }}
      >
        <i className='far fa-edit'></i>Edit
      </p>
      <p className='selected__options'>
        <i className='fas fa-trash selected__options '></i>Delete
      </p>
    </Fragment>
  );
};

export default LinkEditDelete;
