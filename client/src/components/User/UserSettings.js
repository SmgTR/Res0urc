import React, { useContext, useState } from 'react';
import UserAvatar from './UserAvatar';
import UserTheme from './UserTheme';
import UsersContext from '../context/users/usersContext';
import checkImage from '../utils/checkImage';

const UserSettings = ({ user }) => {
  const usersContext = useContext(UsersContext);
  const [msg, setMsg] = useState({});
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const {
    updateTheme,
    updateAvatar,
    updateUserPassword,
    setErrorMsg,
    errorMsg,
    feedbackMsg,
  } = usersContext;

  const manageAvatar = (e) => {
    const imageUrl = e.target.previousElementSibling.value;
    let url = '';
    checkImage(imageUrl, (exists) => {
      if (exists) {
        url = imageUrl;
        setMsg({
          status: true,
          msg:
            'You have changed your avatar! Please reload page to see changes.',
        });
        updateAvatar(url);
      } else {
        setMsg({
          status: false,
          msg: 'Image not existing, please provide correct URL.',
        });
      }
    });
  };

  const successValid = (e) => {
    e.target.classList.add('success__border');
    e.target.classList.remove('error__border');
  };
  const errorValid = (e) => {
    e.target.classList.remove('success__border');
    e.target.classList.add('error__border');
  };

  const changePassword = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === 'new' && e.target.value.length >= 8) {
      successValid(e);
    } else if (
      e.target.name === 'confirm' &&
      e.target.value === passwordData.new
    ) {
      successValid(e);
    } else if (e.target.value === '') {
      e.target.classList = '';
      console.log(e.target.classList);
    } else if (e.target.name !== 'current') {
      errorValid(e);
      setErrorMsg(
        'Passwords are not the same or password has less than 8 characters.'
      );
    }
  };

  return (
    <div className='collections userSettings'>
      <div className='userSettingsInfo flex'>
        <UserAvatar photo={user.photo} />
        <p>{user.name}'s Settings</p>
      </div>
      <p className={`font__medium ${msg.status ? 'success' : 'error'}`}>
        {msg.msg}
      </p>
      <h1>Change Avatar:</h1>

      <div className='changeAvatar flex inputs__default'>
        <input
          type='text'
          placeholder={
            user.photo
              ? user.photo
              : 'Please provide URL address to your avatar.'
          }
        />
        <button className='btn small-btn' onClick={manageAvatar}>
          Submit
        </button>
      </div>
      <h1>Choose theme color:</h1>
      <div className='theme__colors'>
        <UserTheme update={updateTheme} theme={user.theme} />
      </div>
      <h1>Change Password:</h1>
      <p
        className={`${
          feedbackMsg.err === false ? 'success' : 'error'
        } font__medium`}
      >
        {feedbackMsg.text !== '' ? feedbackMsg.text : ''}
      </p>
      <div className='changePassword  inputs__default'>
        <input
          type='password'
          name='current'
          placeholder='Old Password'
          onChange={changePassword}
        />
        <input
          type='password'
          placeholder='New Password'
          name='new'
          onChange={changePassword}
        />
        <input
          type='password'
          placeholder='Repeat Password'
          name='confirm'
          onChange={changePassword}
        />
        <button
          className='btn long-btn'
          onClick={() => {
            updateUserPassword(passwordData);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
