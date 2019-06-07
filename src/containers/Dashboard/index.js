import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Dashboard from '../../components/Dashboard';
import loginOperations from '../../ducks/Login/operations';
import { operations as dashboardOperations } from '../../ducks/Dashboard';
import settingsOperations from '../../ducks/Settings/operations';

const mapStateToProps = (state, ownProps) => {
  return {
    widgets: state.dashboard.widgets,
    user: {
      username: state.login.username,
      profilePic: state.settings.profilePic,
    },
  };
};

const mapDispatchToProps = dispatch => ({
  logout: (cb) => loginOperations.logout(cb)(dispatch),
  getProfilePic: () => settingsOperations.getProfilePic()(dispatch),
  getWidgets: () => dashboardOperations.getWidgets()(dispatch),
  closeWidget: (index) => dashboardOperations.closeWidget(index)(dispatch),
});

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));

export default DashboardContainer;
