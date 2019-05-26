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

const resetPassword = (email) => {
  return {
    type: types.RESET_PASSWORD,
    email,
  };
}

export default {
  login,
  logout,
  resetPassword,
};
