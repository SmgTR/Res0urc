import React, { useContext, useEffect } from 'react';
import Logo from '../UI/Logo';
import UserContext from '../context/users/userContext';

const Header = () => {
  const userContext = useContext(UserContext);
  const { user, getUser } = userContext;

  useEffect(() => {
    getUser();
  }, [user, getUser]);

  return (
    <nav className='nav__bar'>
      <Logo />
      <ul className='userInfo'>
        <li>
          <img src={user.photo} alt='user avatar' />
        </li>
        <li>{user.name}</li>
        <li>Logout</li>
      </ul>
    </nav>
  );
};

export default Header;
