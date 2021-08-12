import React, { useState, useContext, Fragment } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import UserContext from '../context/users/userContext';

const LogIn = () => {
  const userContext = useContext(UserContext);

  const { loginUser, user, setMsg } = userContext;

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const userDataHandler = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const loginUserHandler = (e) => {
    loginUser(loginData);
    e.preventDefault();
  };

  return (
    <Fragment>
      <p className='error__msg'>{setMsg.show ? setMsg.msg : ''}</p>

      <div className='login input__default'>
        <form className='login__form ' onSubmit={loginUserHandler}>
          <Input
            label={'email'}
            input={{
              type: 'text',
              placeholder: 'Email',
              name: 'email',
            }}
            onChange={userDataHandler}
          />
          <Input
            label={'password'}
            input={{
              type: 'password',
              placeholder: 'Password',
              name: 'password',
            }}
            onChange={userDataHandler}
          />
          <Button text='Log in' />
        </form>
      </div>
    </Fragment>
  );
};

export default LogIn;
