import React, { useEffect, useContext } from 'react';
import ResContext from '../context/resources/resContext';

import ResItem from './ResItem';

const UserRes = () => {
  const resContext = useContext(ResContext);
  const { userResources, getResources } = resContext;

  useEffect(() => {
    getResources();
    console.log(userResources);
  }, []);

  return (
    <div className='user__lists container-pd'>
      <h1>My resources:</h1>
      {userResources.length === 0 ? (
        <h2 className='error__msg empty'>
          Nothing here yet, please visit our site and add your first collection!
        </h2>
      ) : (
        ''
      )}
      <ResItem res={userResources} />
    </div>
  );
};

export default UserRes;
