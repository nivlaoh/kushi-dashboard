import { LOGIN, LOGOUT, RESET_PASSWORD, GET_USER_INFO, UPDATE_USER_INFO } from './types';

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
    case GET_USER_INFO:
      return {
        ...state,
        ...action.user,
      };
    case UPDATE_USER_INFO:
      return {
        ...state,
        [action.field]: action.value,
      };
    case RESET_PASSWORD:
    default:
      return state;
  }
};

export default loginReducer;
