import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Login from '../../components/Login';
import operations from '../../ducks/Login/operations';

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  login: (username, password, cb) => operations.login(username, password, cb)(dispatch),
  logout: operations.logout,
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));

export default LoginContainer;
