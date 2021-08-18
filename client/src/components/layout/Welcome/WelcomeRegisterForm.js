import React, { useEffect, useState, useContext } from 'react';
import UsersContext from '../../context/users/usersContext';

const WelcomeRegisterForm = ({ setRegister }) => {
  useEffect(() => {
    function hide(e) {
      if (e.target.classList.contains('form__container')) {
        setRegister(false);
      }
    }

    document.addEventListener('click', hide);
  }, []);

  const usersContext = useContext(UsersContext);

  const { feedbackMsg, setErrorMsg, signUp } = usersContext;

  const [formData, setFormData] = useState({
    valid: false,
    data: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const setInfo = (e) => {
    setFormData({
      ...formData,
      data: { ...formData.data, [e.target.name]: e.target.value },
    });
    formValidation(e);
  };

  const formValidation = (e) => {
    const target = e.target;
    console.log(formData.data);
    const { password, passwordConfirm, signUp } = formData.data;

    if (target.name === 'passwordConfirm') {
      if (target.value === password) {
        target.classList.add('success__border');
        target.classList.remove('error__border');
      } else {
        target.classList.add('error__border');
        target.classList.remove('success__border');
        setErrorMsg('Passwords are not the same!');
      }
    }

    if (target.name === 'password') {
      if (target.value.length >= 8) {
        target.classList.add('success__border');
        target.classList.remove('error__border');
      } else {
        target.classList.add('error__border');
        target.classList.remove('success__border');
        setErrorMsg('Password must have at least 8 characters.');
      }
    }

    if (target.name === 'name') {
      if (target.value.length < 16) {
        target.classList.add('success__border');
        target.classList.remove('error__border');
      } else {
        target.classList.add('error__border');
        target.classList.remove('success__border');
        setErrorMsg('Username is too long!');
      }
    }
  };
  const createNewUser = (e) => {
    e.preventDefault();
    if (!feedbackMsg.err) {
      signUp(formData.data);
    }
  };

  return (
    <div className='register__form inputs__default'>
      <div className='form__container'>
        <div className='form__bg'>
          <header className='header__reg'>
            <h1>Sign Up</h1>
          </header>
          <h1 className='error'>{feedbackMsg.text}</h1>
          <form onSubmit={createNewUser}>
            <label htmlFor='name'>Username:</label>
            <input
              type='text'
              name='name'
              placeholder='Username, max 20 characters'
              onChange={setInfo}
              required
            />
            <label htmlFor='email'>E-mail:</label>
            <input
              type='email'
              name='email'
              placeholder='Email address'
              onChange={setInfo}
              required
            />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              placeholder='Password, min. 8 characters'
              onChange={setInfo}
              required
            />
            <label htmlFor='passwordConfirm'>Password Confirm:</label>
            <input
              type='password'
              name='passwordConfirm'
              placeholder='Please confirm your password'
              onChange={setInfo}
              required
            />
            <button className='btn long-btn'>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WelcomeRegisterForm;
