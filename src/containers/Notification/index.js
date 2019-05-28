import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Notification from '../../components/Notification';
import messages from '../../components/Dashboard/messages.json';
import { operations } from '../../ducks/Notification';

const onRead = (msg) => {
  messages.forEach(message => {
    if (message.id === msg.id) {
      message.status = 'READ';
    }
  });
};

const mapStateToProps = (state, ownProps) => {
  console.log('state', state);
  return {
    showToast: state.notification.status,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  messages,
  onRead,
  onSend: (message) => operations.sendEmail(message)(dispatch),
});

const NotificationContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(Notification));

export default NotificationContainer;
