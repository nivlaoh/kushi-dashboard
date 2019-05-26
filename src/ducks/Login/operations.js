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

const resetPassword = (email, cb) => (dispatch) => {
  dispatch(actions.resetPassword(email));
  cb();
};

export default {
  login,
  logout,
  resetPassword,
};
