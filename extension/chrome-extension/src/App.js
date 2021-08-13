import React, { useState, useEffect } from 'react';
import './sass/main.scss';
import UserState from './components/context/users/UserState';
import LogIn from './components/layout/LogIn';
import LoggedScreen from './components/layout/LoggedScreen';
import ResState from './components/context/resources/ResState';

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
      <ResState>
        {!user && (
          <div className='no-user'>
            <h1>Log in to start using our extension.</h1>
            <LogIn />
          </div>
        )}
        {user && <LoggedScreen />}
      </ResState>
    </UserState>
  );
}

export default App;
