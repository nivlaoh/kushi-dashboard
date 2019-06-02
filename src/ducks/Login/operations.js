import actions from './actions';

import fakeAuth from '../../shared/components/Auth/auth';

const login = (username, password, cb) => (dispatch) => {
  dispatch(actions.login(username, password));
  localStorage.setItem('username', username);
  localStorage.setItem('token', username+password);
  fakeAuth.authenticate(cb);
};

const logout = (cb) => (dispatch) => {
  dispatch(actions.logout());
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  fakeAuth.signout(cb);
};

const resetPassword = (email, cb = () => {}) => (dispatch) => {
  dispatch(actions.resetPassword(email));
  cb();
};

const getUserInfo = () => (dispatch) => {
  const username = localStorage.getItem('username');
  const firstName = localStorage.getItem('firstName');
  const lastName = localStorage.getItem('lastName');
  dispatch(actions.getUserInfo({
    username,
    firstName,
    lastName,
  }));
};

const updateUserInfo = (field, value) => (dispatch) => {
  localStorage.setItem(field, value);
  dispatch(actions.updateUserInfo(field, value));
};

export default {
  login,
  logout,
  resetPassword,
  getUserInfo,
  updateUserInfo,
};
