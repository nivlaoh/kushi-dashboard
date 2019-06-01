import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Dashboard from '../../components/Dashboard';
import loginOperations from '../../ducks/Login/operations';
import settingsOperations from '../../ducks/Settings/operations';
import widgetData from '../../components/Dashboard/widget.json';

const mapStateToProps = (state, ownProps) => {
  console.log('data', widgetData);
  return {
    widgets: widgetData,
    user: {
      username: state.login.username,
      profilePic: state.settings.profilePic,
    },
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: (cb) => loginOperations.logout(cb)(dispatch),
  getProfilePic: () => settingsOperations.getProfilePic()(dispatch),
});

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));

export default DashboardContainer;
