import React, { Fragment } from 'react';

import userAvatarDefault from '../../assets/default.png';

const UserAvatar = props => {
  return (
    <Fragment>
      <img
        src={props.photo === '' ? userAvatarDefault : props.photo}
        alt="User avatar"
      />
    </Fragment>
  );
};

export default UserAvatar;
