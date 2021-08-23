import React, { useContext, useEffect } from 'react';
import UsersContext from '../context/users/usersContext';
import welcome from '../../assets/welcome.svg';

const Login = ({ formData }) => {
  const usersContext = useContext(UsersContext);

  useEffect(() => {
    setTimeout(() => {
      window.location.replace('/');
    }, 2000);
  }, []);

  const { user } = usersContext;

  return (
    <div className='loginWelcomeScreen'>
      <h1>Welcome!</h1>
      <p>You are going to be redirected to Home Page</p>
      <img src={welcome} alt='welcome image' />
    </div>
  );
};

export default Login;
