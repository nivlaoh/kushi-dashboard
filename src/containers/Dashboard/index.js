import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dashboard from '../../components/Dashboard';
import operations from '../../ducks/Login/operations';
import widgetData from '../../components/Dashboard/widget.json';

const mapStateToProps = (state, ownProps) => {
  console.log('data', widgetData);
  return {
    widgets: widgetData,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  logout: () => operations.logout()(dispatch),
});

const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(Dashboard);

export default DashboardContainer;
