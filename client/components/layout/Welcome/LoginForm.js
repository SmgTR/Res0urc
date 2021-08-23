import React, { useState } from 'react';

const LoginForm = ({ login, msg }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const updateData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const loginUser = (e) => {
    e.preventDefault();
    login(userData);
  };
  return (
    <div className='loginDropdown loginTrigger'>
      <p className='error'>{msg.text}</p>
      <form
        onSubmit={loginUser}
        className='loginForm inputs__default loginTrigger'
      >
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          name='email'
          placeholder='E-mail'
          autoFocus
          onChange={updateData}
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          placeholder='Password'
          onChange={updateData}
          required
        />
        <button className='btn'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
