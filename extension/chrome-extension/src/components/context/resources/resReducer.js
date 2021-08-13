import { GET_POPULAR } from '../../types';

export default (state, action) => {
  switch (action.type) {
    case GET_POPULAR: {
      return {
        ...state,
        popular: action.payload,
      };
    }
  }
};
