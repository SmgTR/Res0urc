import { GET_USER, CLEAR_MSG, SET_MSG } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case SET_MSG: {
      return {
        ...state,
        setMsg: { show: true, msg: action.payload },
      };
    }
    case CLEAR_MSG: {
      return {
        ...state,
        setMsg: { show: false, msg: '' },
      };
    }
  }
};
