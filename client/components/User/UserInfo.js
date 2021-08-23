import React, { Fragment } from 'react';
import UserAvatar from './UserAvatar';

const UserInfo = props => {
  return (
    <Fragment>
      Author: <UserAvatar photo={props.photo} />
      <h4>{props.name}</h4>
    </Fragment>
  );
};

export default UserInfo;
