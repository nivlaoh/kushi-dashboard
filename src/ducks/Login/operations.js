import actions from './actions';

import fakeAuth from '../../shared/components/Auth/auth';

const login = (username, password, cb) => (dispatch) => {
  dispatch(actions.login(username, password));
  fakeAuth.authenticate(cb);
};

const logout = (cb) => (dispatch) => {
  dispatch(actions.logout());
  fakeAuth.signout(cb);
};

export default {
  login,
  logout,
};
