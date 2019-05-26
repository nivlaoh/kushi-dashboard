import { LOGIN, LOGOUT, RESET_PASSWORD } from './types';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.username,
        password: action.password,
      };
    case LOGOUT:
      return {
        ...state,
        username: null,
        password: null,
      };
    case RESET_PASSWORD:
    default:
      return state;
  }
};

export default loginReducer;
