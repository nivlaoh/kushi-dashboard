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

const getUserInfo = (user) => {
  return {
    type: types.GET_USER_INFO,
    user,
  };
};

const updateUserInfo = (field, value) => {
  return {
    type: types.UPDATE_USER_INFO,
    field,
    value,
  };
}

export default {
  login,
  logout,
  resetPassword,
  getUserInfo,
  updateUserInfo,
};
