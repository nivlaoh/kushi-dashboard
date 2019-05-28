import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Notification from '../../components/Notification';

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
});

const NotificationContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Notification));

export default NotificationContainer;
