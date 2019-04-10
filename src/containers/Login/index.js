import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Login from '../../components/Login';
import operations from '../../ducks/Login/operations';

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (username, password) => operations.login(username, password)(dispatch),
  logout: operations.logout,
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
