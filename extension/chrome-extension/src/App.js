import React, { useState, useEffect, Fragment } from 'react';
import './sass/main.scss';
import UserState from './components/context/users/UserState';
import LogIn from './components/layout/LogIn';
import LoggedScreen from './components/layout/LoggedScreen';

function App() {
  const [user, setLoginUser] = useState(true);

  useEffect(() => {
    const loggedIn = localStorage.getItem('token');

    if (loggedIn) {
      setLoginUser(true);
    } else {
      setLoginUser(false);
    }
  }, [user]);

  return (
    <UserState>
      {!user && (
        <div className='no-user'>
          <h1>Log in to start using our extension.</h1>
          <LogIn />
        </div>
      )}
      {user && <LoggedScreen />}
    </UserState>
  );
}

export default App;
