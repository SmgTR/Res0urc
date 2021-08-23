import React from 'react';

const DeleteCollectionConfirmation = ({ confirm, setConfirm, deleteItem }) => {
  return (
    <div className='confirm'>
      <div className='confirm__body'>
        <div className='confirm__manage'>
          <button className='add' onClick={() => setConfirm(false)}>
            Cancel
          </button>
          <button className='error__btn mt-small' onClick={deleteItem}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCollectionConfirmation;
