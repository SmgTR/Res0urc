import {
  DISPLAY_SETTINGS,
  GET_USER,
  LOGIN_USER,
  ERROR_MSG,
  HIDE_MSG,
  SUCCESS_MSG,
} from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_USER:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case DISPLAY_SETTINGS:
      return {
        ...state,
        userSettings: action.payload,
      };
    case ERROR_MSG:
      return {
        ...state,
        feedbackMsg: { err: true, text: action.payload },
      };
    case SUCCESS_MSG:
      return {
        ...state,
        feedbackMsg: { err: false, text: action.payload },
      };
    case HIDE_MSG:
      return {
        ...state,
        feedbackMsg: { err: false, text: '' },
      };
    default:
      return state;
  }
};
