import React, { useReducer } from 'react';
import axios from 'axios';
import UsersContext from './usersContext';
import UsersReducer from './usersReducer';
import setAuthToken from '../../utils/setAuthToken';

import {
  GET_USER,
  LOGIN_USER,
  DISPLAY_SETTINGS,
  ERROR_MSG,
  HIDE_MSG,
  SUCCESS_MSG,
} from '../../types';

const UsersState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    userSettings: false,
    feedbackMsg: { err: false, text: '' },
  };

  const [state, dispatch] = useReducer(UsersReducer, initialState);

  const getUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(`/api/v1/users/me`);

      dispatch({ type: GET_USER, payload: res.data });

      res ? setThemeColor(res.data.data.data.theme) : setThemeColor('0078a8');
    } catch (err) {
      console.log(err);
    }
  };

  const addToUsersBookmarks = async (listId) => {
    try {
      const data = state.user.data.data.savedLists;
      data.push({ listId });

      const res = await axios.patch(`/api/v1/users/updateMe`, {
        savedLists: data,
      });
      console.log(state.user);
    } catch (err) {
      console.log(err.response.data);
    }
  };
  const removeUsersBookmarks = async (listId) => {
    try {
      const data = state.user.data.data.savedLists;

      for (let i = 0; i < data.length; i++) {
        if (data[i].listId === listId) {
          data.splice(i, 1);
        }
      }
      await axios.patch(`/api/v1/users/updateMe`, {
        savedLists: data,
      });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const loginUser = async (formData) => {
    try {
      const data = {
        email: formData.email,
        password: formData.password,
      };

      const res = await axios.post('/api/v1/users/login', data);

      dispatch({ type: LOGIN_USER, payload: res.data });
      getUser();
      window.location.replace('/login');
    } catch (err) {
      const error = err.response.data;
      setErrorMsg('Incorrect email or password');
    }
  };

  const displaySettings = (display) => {
    dispatch({ type: DISPLAY_SETTINGS, payload: display });
  };

  const setThemeColor = (color) => {
    document.documentElement.style.setProperty(
      '--theme',
      `#${color || state.user.data.data.theme}`
    );
  };

  const updateTheme = async (color) => {
    try {
      const res = await axios.patch(`/api/v1/users/updateMe`, {
        theme: color,
      });
      console.log(res);
      setThemeColor(color);
    } catch (err) {
      console.log(err);
    }
  };

  const updateAvatar = async (url) => {
    try {
      const res = await axios.patch(`/api/v1/users/updateMe`, {
        photo: url,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateUserPassword = async (data) => {
    try {
      const res = await axios.patch(`/api/v1/users/updateMyPassword`, {
        passwordCurrent: data.current,
        password: data.new,
        passwordConfirm: data.confirm,
      });

      setSuccessMsg('Password changed successfully.');
    } catch (err) {
      const error = err.response.data;

      setErrorMsg(error.error ? error.message : '');
    }
  };

  const setSuccessMsg = (msg) => {
    dispatch({ type: SUCCESS_MSG, payload: msg });

    setTimeout(() => {
      dispatch({ type: HIDE_MSG });
    }, 4000);
  };

  const setErrorMsg = (msg) => {
    dispatch({ type: ERROR_MSG, payload: msg });

    setTimeout(() => {
      dispatch({ type: HIDE_MSG });
    }, 2000);
  };

  const logout = () => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.clear();
    window.location.reload();
  };

  const signUp = async (formData) => {
    try {
      const res = await axios.post('/api/v1/users/signup', formData);
      dispatch({ type: LOGIN_USER, payload: res.data });

      getUser();
      localStorage.setItem('tutorial', true);

      if (res) {
        window.location.replace('/login');
      }
    } catch (err) {
      console.log(err.response.data);
      console.log(err.response.data.error);

      if (err.response.data.error.code == 11000) {
        setErrorMsg(
          'User with this email address already exist, please try to log in.'
        );
      }
    }
  };

  return (
    <UsersContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        userSettings: state.userSettings,
        current: state.current,
        feedbackMsg: state.feedbackMsg,
        getUser,
        loginUser,
        addToUsersBookmarks,
        removeUsersBookmarks,
        displaySettings,
        updateTheme,
        updateAvatar,
        updateUserPassword,
        setErrorMsg,
        logout,
        signUp,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersState;
