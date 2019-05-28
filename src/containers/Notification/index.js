import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Notification from '../../components/Notification';
import messages from '../../components/Dashboard/messages.json';

const onRead = (msg) => {
  messages.forEach(message => {
    if (message.id === msg.id) {
      message.status = 'READ';
    }
  });
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  messages,
  onRead,
});

const NotificationContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Notification));

export default NotificationContainer;
