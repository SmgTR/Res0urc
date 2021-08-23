import React, { useReducer } from 'react';
import UsersContext from './userContext';
import userReducer from './userReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import { GET_USER, SET_MSG, CLEAR_MSG } from '../../types';

const UserState = (props) => {
  const initialState = {
    user: {},
    setMsg: { show: false, msg: '' },
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  const setToken = (loginToken) => {
    localStorage.setItem('token', loginToken);
  };

  const msgHandler = (msg) => {
    dispatch({ type: SET_MSG, payload: msg });
    setTimeout(() => {
      clearMsg();
    }, 5000);
  };

  const clearMsg = () => {
    dispatch({ type: CLEAR_MSG });
  };

  const loginUser = async (data) => {
    try {
      const loginData = {
        email: data.email,
        password: data.password,
      };

      const res = await axios.post(
        'https://res0urc.herokuapp.com/api/v1/users/login',
        loginData
      );

      setToken(res.data.token);

      window.location.reload();
    } catch (err) {
      msgHandler(err.response.data.message);
    }
  };

  const logout = () => {
    document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.clear();
    window.location.reload();
  };

  const getUser = async () => {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get(
        `https://res0urc.herokuapp.com/api/v1/users/me`
      );

      dispatch({ type: GET_USER, payload: res.data.data.data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <UsersContext.Provider
      value={{
        user: state.user,
        setMsg: state.setMsg,
        loginUser,
        logout,
        getUser,
        msgHandler,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};

export default UserState;
