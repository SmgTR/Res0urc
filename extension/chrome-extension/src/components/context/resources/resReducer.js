import {
  GET_POPULAR,
  GET_MY_RES,
  SET_CURRENT,
  CLEAR_CURRENT,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_POPULAR: {
      return {
        ...state,
        popular: action.payload,
      };
    }
  }
  switch (action.type) {
    case GET_MY_RES: {
      return {
        ...state,
        userResources: action.payload,
      };
    }
  }
  switch (action.type) {
    case CLEAR_CURRENT: {
      return {
        ...state,
        current: null,
      };
    }
  }
  switch (action.type) {
    case SET_CURRENT: {
      return {
        ...state,
        current: action.payload,
      };
    }
  }
};
