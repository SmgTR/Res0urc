import React, { useContext, Fragment } from 'react';
import ResContext from '../context/resources/resContext';

const LinkEditDelete = ({ add, edit }) => {
  const resContext = useContext(ResContext);

  const { setUpdateListItem, selected, current, removeListItem } = resContext;

  const deleteLink = () => {
    const list = current[0].links;

 
    const updateList = list.filter((links) => {
      
      return links._id !== selected[0].id;
    });

    removeListItem(updateList);
  };
  return (
    <Fragment>
      <p
        className='selected__options'
        onClick={() => {
          add();
          setUpdateListItem(true);
        }}
      >
        <i className='far fa-edit'></i>Edit
      </p>
      <p className='selected__options' onClick={deleteLink}>
        <i className='fas fa-trash selected__options '></i>Delete
      </p>
    </Fragment>
  );
};

export default LinkEditDelete;
