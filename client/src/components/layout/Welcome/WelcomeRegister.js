import React from 'react';
import account from '../../../assets/account.svg';

const WelcomeRegister = ({ setRegister }) => {
  return (
    <div className='create__account__item flex'>
      <img src={account} alt='create account' />

      <h1>
        Create your free account in 5 seconds.
        <span onClick={() => setRegister(true)}>
          Start here <i className='fas fa-arrow-right' />
        </span>
      </h1>
    </div>
  );
};

export default WelcomeRegister;
