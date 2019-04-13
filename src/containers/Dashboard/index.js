import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import Dashboard from '../../components/Dashboard';
import operations from '../../ducks/Login/operations';
import widgetData from '../../components/Dashboard/widget.json';

const mapStateToProps = (state, ownProps) => {
  console.log('data', widgetData);
  return {
    widgets: widgetData,
    user: { username: state.login.username },
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: (cb) => operations.logout(cb)(dispatch),
});

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));

export default DashboardContainer;
