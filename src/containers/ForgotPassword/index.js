import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ForgotPassword from '../../components/ForgotPassword';
import operations from '../../ducks/Login/operations';

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  resetPassword: (email, cb) => operations.resetPassword(email, cb)(dispatch),
});

const ForgotPasswordContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(ForgotPassword));

export default ForgotPasswordContainer;
