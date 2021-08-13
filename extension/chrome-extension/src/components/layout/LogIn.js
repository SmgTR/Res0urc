import React, { useState, useContext, Fragment } from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import UserContext from '../context/users/userContext';

const LogIn = () => {
  const userContext = useContext(UserContext);

  const { loginUser, setMsg } = userContext;

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
              required: true,
            }}
            onChange={userDataHandler}
          />
          <Input
            label={'password'}
            input={{
              type: 'password',
              placeholder: 'Password',
              name: 'password',
              required: true,
            }}
            onChange={userDataHandler}
          />
          <Button stylingClass='button-y-animation' text='Log in' />
        </form>
      </div>
      <h3 className='create__account'>
        No account yet? Please start{' '}
        <a href='https://res0urc.herokuapp.com/#'>here</a>
      </h3>
    </Fragment>
  );
};

export default LogIn;
