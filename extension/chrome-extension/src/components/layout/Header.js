import React, { useContext, useEffect } from 'react';
import Logo from '../UI/Logo';
import UserContext from '../context/users/userContext';
import defaultAvatar from '../../assets/default.png';

const Header = () => {
  const userContext = useContext(UserContext);
  const { user, getUser, logout } = userContext;

  useEffect(() => {
    getUser();
  }, [user, getUser]);

  return (
    <nav className='nav__bar'>
      <Logo />
      <ul className='userInfo'>
        <li>
          <img src={user.photo || defaultAvatar} alt='user avatar' />
        </li>
        <li>{user.name}</li>
        <li className='logout' onClick={() => logout()}>
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default Header;
