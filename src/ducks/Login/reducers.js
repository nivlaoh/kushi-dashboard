import types from './types';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        username: action.username,
        password: action.password,
      };
    case types.LOGOUT:
      return {
        ...state,
        username: null,
        password: null,
      };
    default:
      return state;
  }
};

export default loginReducer;
