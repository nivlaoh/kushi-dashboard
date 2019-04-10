import actions from './actions';

const login = (username, password) => (dispatch) => {
  dispatch(actions.login(username, password));
};

const logout = () => (dispatch) => {
  dispatch(actions.logout());
};

export default {
  login,
  logout,
};
