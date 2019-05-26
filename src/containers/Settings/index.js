import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Settings from '../../components/Settings';
import operations from '../../ducks/Login/operations';

const mapStateToProps = (state, ownProps) => {
  return {
    user: { username: state.login.username },
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: (cb) => operations.logout(cb)(dispatch),
});

const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Settings));

export default SettingsContainer;
