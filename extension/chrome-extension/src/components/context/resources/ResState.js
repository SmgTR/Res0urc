import React, { useReducer } from 'react';
import ResContext from './resContext';
import resReducer from './resReducer';
import axios from 'axios';

import {
  GET_POPULAR,
  GET_MY_RES,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../../types';

const ResState = (props) => {
  const initialState = {
    popular: [],
    current: null,
    userResources: [],
    selected: [],
    setResMsg: { show: false, msg: '' },
  };

  const [state, dispatch] = useReducer(resReducer, initialState);

  const getPopular = async () => {
    try {
      const res = await axios.get(
        `https://res0urc.herokuapp.com/api/v1/resources?public=true&page=1&limit=4&sort=popular`
      );

      dispatch({ type: GET_POPULAR, payload: res.data.data.data });
    } catch (err) {
      console.log(err);
    }
  };

  const openSelected = () => {
    const myLinks = state.selected;
    for (var i = 0; i < myLinks.length; i++) {
      window.open(myLinks[i].url);
    }
  };

  const openAll = () => {
    const myLinks = state.current.links;

    for (var i = 0; i < myLinks.length; i++) {
      window.open(myLinks[i].url);
    }
  };

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const getResources = async () => {
    try {
      const res = await axios.get(
        'https://res0urc.herokuapp.com/api/v1/resources/my'
      );

      dispatch({ type: GET_MY_RES, payload: res.data.data.data });
    } catch (err) {
      console.log(err);
    }
  };

  const getOnePublic = async (id) => {
    try {
      const res = await axios.get(
        `https://res0urc.herokuapp.com/api/v1/resources/${id}`
      );

      const output = res.data.data.data;

      dispatch({ type: SET_CURRENT, payload: output });
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const addSelect = (item) => {
    state.selected.push({ id: item.id, url: item.url });
  };

  const removeSelect = (item) => {
    let arr = [...state.selected];
    arr = state.selected.filter((el) => {
      return el.id !== item;
    });

    state.selected = [...arr];
  };

  return (
    <ResContext.Provider
      value={{
        popular: state.popular,
        userResources: state.userResources,
        current: state.current,
        selected: state.selected,
        getPopular,
        getResources,
        getOnePublic,
        openAll,
        openSelected,
        clearCurrent,
        addSelect,
        removeSelect,
      }}
    >
      {props.children}
    </ResContext.Provider>
  );
};

export default ResState;
