import React, { useReducer } from 'react';
import ResContext from './resContext';
import resReducer from './resReducer';
import axios from 'axios';

import { GET_POPULAR } from '../../types';

const ResState = (props) => {
  const initialState = {
    popular: [],
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

  return (
    <ResContext.Provider value={{ popular: state.popular, getPopular }}>
      {props.children}
    </ResContext.Provider>
  );
};

export default ResState;
