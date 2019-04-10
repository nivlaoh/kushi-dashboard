import types from './types';

export const login = (username, password) => {
  return {
    type: types.LOGIN,
    username,
    password,
  };
};

export const logout = () => {
  return {
    type: types.LOGOUT,
  };
};

export default {
  login,
  logout
};
